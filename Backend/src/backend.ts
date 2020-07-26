import {ImageStore} from "./ImageStore";
import {ImageMetadata} from "./ImageMetadata";
import {birthtime, color, ImageSorter, name, random} from "./ImageSorter";
import {Express} from "express";
import {Config} from "./Config";
import * as express from "express";
import * as cors from 'cors';
import {promises as fs} from 'fs';
import * as shortid from 'shortid';
import * as sharp from 'sharp';
import * as path from 'path';
import splashy = require("splashy");

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

    private async getSortedImageList(type: string): Promise<ImageMetadata[]> {
        let sorter: ImageSorter | undefined = undefined;
        switch (type) {
            case "birthtime":
                sorter = birthtime;
            case "alphabetically":
                sorter = name;
            case "colors":
                sorter = color;
            case "random":
                sorter = random;
        }
        return ImageStore.listImages(sorter)
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
            let id = shortid.generate();
            await fs.mkdir(path.join(__dirname, `../data/${id}`));
            let buffer = await ImageStore.convertImg(req.body);
            const palette = await splashy(buffer);
            const colors = {
                image: id,
                hexcodes: palette
            };
            const data = JSON.stringify(colors);
            await fs.writeFile(path.join(__dirname, `../data/${id}/colors.json`), data);
            await fs.writeFile(path.join(__dirname, `../data/${id}/original`), buffer);
            res.end();

        });

        this._app.get('/image/:tag', async function (req, res) {

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
            const data = JSON.parse(await fs.readFile(path.join(__dirname, `../data/${tag}/colors.json`), {encoding: 'utf8'}));
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
            const count = req.query['count'] !== undefined ? parseInt(req.query['count'] as string) : 20;
            const skip = req.query['skip'] !== undefined ? parseInt(req.query['skip'] as string) : 0;
            const order = req.query['order'] ?? 'asc';

            let sortedImages = await this.getSortedImageList(sort as string);

            let responseImages = this.selectForPagination(sortedImages, count, skip);

            if (order === 'desc') responseImages.reverse();

            const response = {
                sort: sort,
                order: order,
                count: count,
                images: responseImages
            };

            await this.storeResponse(response);

            res.send(response);
        });
    }

    private async storeResponse(images) {
        const data = JSON.stringify(images);
        await fs.writeFile(path.join(__dirname, '../imageData.json'), data);
    }

    private selectForPagination(source: ImageMetadata[], count: number, skip: number): ImageMetadata[] {
        return source.slice(skip, count);
    }
}

const app = new BackendApplication();
app.start();