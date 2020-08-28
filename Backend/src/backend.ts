import {ImageStore} from "./ImageStore";
import {ImageMetadata} from "./ImageMetadata";
import {birthtime, color, ImageSorter, name, random} from "./ImageSorter";
import * as express from "express";
import {Express} from "express";
import {Config} from "./Config";
import * as cors from 'cors';
import {promises as fs} from 'fs';
import * as shortId from 'shortid';
import * as sharp from 'sharp';
import * as path from 'path';
import {imageSize} from 'image-size';
import {ISizeCalculationResult} from 'image-size/dist/types/interface';
import vibrant = require("node-vibrant");

type OrientationType = 'portrait' | 'landscape' | 'square';

interface StoredImageMeta extends ISizeCalculationResult
{
    image: string;
    hexcodes: string[];
}

class BackendApplication {

    private _app: Express;

    private _config: Config;

    constructor() {
        this._app = express();
        this._config = new Config()
    }

    public start() {
        this.initializeServer();
        this.initializeEndpoints();

        this._app.listen(3000, function () {
            console.log('Listening on port 3000');
        });
    }

    private static async getMetadata(buffer: Buffer, id: string): Promise<StoredImageMeta> {
        const imagePath = path.join(__dirname, `../data/${id}/original`);
        const palette = await vibrant.from(path.join(__dirname, `../data/${id}/original`)).getSwatches();
        let hexcodes = [];

        for (let swatch in palette) {
            hexcodes.push({
                name: swatch,
                color: palette[swatch].getHex(),
                population: palette[swatch].getPopulation(),
                rgb: palette[swatch].getRgb(),
                hsl: palette[swatch].getHsl()
            });
        }
        hexcodes.sort((a, b) => (b.population - a.population));

        const colors = {
            image: id,
            path: `http://localhost:3000/image/${id}`,
            hexcodes: hexcodes
        };
        const dimensions = imageSize(buffer);
        let mode;
        if (dimensions.height > dimensions.width) {
            mode = 'portrait';
        } else if (dimensions.height < dimensions.width) {
            mode = 'landscape';
        } else mode = 'square';
        dimensions['mode'] = mode;

        return Object.assign({}, colors, dimensions);
    }

    private static async getSortedImageList(type: string): Promise<ImageMetadata[]> {
        let sorter: ImageSorter | undefined = undefined;
        switch (type) {
            case "birthtime":
                sorter = birthtime;
                break;
            case "alphabetically":
                sorter = name;
                break;
            case "colors":
                sorter = color;
                break;
            case "random":
                sorter = random;
        }
        return ImageStore.listImages(sorter)
    }

    private static async getListInMode(mode: string) {
        const directory = await fs.readdir(path.join(__dirname, '../data'));
        let list = [];

        for (let i = 0; i < directory.length; i++) {
            // @ts-ignore
            const imageData = JSON.parse(await fs.readFile(path.join(__dirname, `../data/${directory[i]}/metadata.json`)));
            if(imageData.mode === mode){
                list.push(imageData);
            }
        }
        return list;
    }

    private initializeServer(): void {
        this._app.use(cors());

        this._app.use(express.raw({
            type: '*/*', limit: '4gb'
        }));
    }

    private initializeEndpoints(): void {
        this._app.post('/', async function (req, res) {
            try {
                await fs.access(path.join(__dirname, '../data'));
            } catch (e) {
                await fs.mkdir(path.join(__dirname, '../data'));
            }
            try {
                await sharp(req.body);
            } catch (err) {
                res.sendStatus(415);
                return;
            }
            const id = shortId.generate();
            await fs.mkdir(path.join(__dirname, `../data/${id}`));
            const buffer = await ImageStore.convertImg(req.body);

            await fs.writeFile(path.join(__dirname, `../data/${id}/original`), buffer);

            const response = await BackendApplication.getMetadata(buffer, id);

            await fs.writeFile(path.join(__dirname, `../data/${id}/metadata.json`), JSON.stringify(response));
            res.end();

        });

        this._app.get('/image/:tag', async (req, res) => {

            const tagParam = req.params['tag'];
            const sizeParam = req.query['size'];
            const square = 'square' in req.query;
            const sharpen = 'sharpen' in req.query;
            const blur = 'blur' in req.query;
            let size;

            if (sizeParam !== null) {
                size = await this._config.getImageSize(sizeParam);
            }
            let result;
            try {
                result = await ImageStore.loadImg(tagParam, size, square, sharpen, blur);

            } catch (e) {
                res.sendStatus(404);
                return;
            }

            res.set('Content-Type', 'image/jpeg');
            res.send(result);
        });

        this._app.get('/colors/:tag', async function (req, res) {
            const tag = req.params['tag'];
            const data = JSON.parse(await fs.readFile(path.join(__dirname, `../data/${tag}/metadata.json`), {encoding: 'utf8'}));
            res.send(data.hexcodes);
        });

        this._app.delete('/imageList', async function (req, res) {
            const directoryList = await fs.readdir(path.join(__dirname, '../data'));

            for (const dir of directoryList) {

                const imageDirEntries = await fs.readdir(path.join(__dirname, `../data/${dir}`));

                for (const imageDirEntry of imageDirEntries) {
                    await fs.unlink(path.join(__dirname, `../data/${dir}/${imageDirEntry}`));
                }

                await fs.rmdir(path.join(__dirname, `../data/${dir}`));

            }
            res.send('all images deleted');
        });

        this._app.delete('/imageList/:img', async function (req, res) {
            const {img} = req.params;
            const fileList = await fs.readdir(path.join(__dirname, `../data/${img}`));
            for (const imgFile of fileList) {
                await fs.unlink(path.join(__dirname, `../data/${img}/${imgFile}`));
            }
            await fs.rmdir(path.join(__dirname, `../data/${img}`));
            res.send('image deleted');
        });

        this._app.get('/api/imageData', async (req, res) => {
            const sort = req.query['sort'] ?? 'random';
            const skip = req.query['skip'] !== undefined ? parseInt(req.query['skip'] as string) : 0;
            const order = req.query['order'] ?? 'asc';

            let sortedImages = await BackendApplication.getSortedImageList(sort as string);

            const count = req.query['count'] !== undefined ? parseInt(req.query['count'] as string) : sortedImages.length;

            let responseImages = BackendApplication.selectForPagination(sortedImages, count, skip);

            if (order === 'desc') responseImages.reverse();

            const response = {
                sort: sort,
                order: order,
                count: count,
                skip: skip,
                images: responseImages
            };

            await BackendApplication.storeResponse(response);

            res.send(response);
        });

        this._app.get('/random', async (req, res) => {
            const mode = req.query['mode'] ?? 'landscape';
            const listInMode = await BackendApplication.getListInMode(mode as string);
            const result = listInMode[Math.floor(Math.random() * listInMode.length)];

            res.send(result);

        });
    }

    private static async storeResponse(images) {
        const data = JSON.stringify(images);
        await fs.writeFile(path.join(__dirname, '../imageData.json'), data);
    }

    private static selectForPagination(source: ImageMetadata[], count: number, skip: number): ImageMetadata[] {
        return source.slice(skip, count);
    }
}

const app = new BackendApplication();
app.start();