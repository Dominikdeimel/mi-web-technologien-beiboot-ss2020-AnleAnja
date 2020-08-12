import * as path from 'path';
import {promises as fs} from 'fs'
import sharp = require("sharp");
import {ImageSorter, random} from "./ImageSorter";
import {ImageMetadata} from "./ImageMetadata";

export class ImageStore {

    public static async listImages(sorter: ImageSorter = random): Promise<ImageMetadata[]> {
        const imageData = await this.getImageData();
        return sorter(imageData);
    }

    private static async getImageData(): Promise<ImageMetadata[]> {

        const fileList = await fs.readdir(path.join(__dirname, '../data/'));

        const data: ImageMetadata[] = [];
        for (const filename of fileList) {
            let imgPath = path.join(__dirname, `../data/${filename}/original`);
            let file = await fs.open(imgPath, 'r');
            const fileContent = await fs.readFile(path.join(__dirname, `../data/${filename}/metadata.json`), {encoding: 'utf8'});
            const content = JSON.parse(fileContent);
            let stat = await file.stat();
            await file.close();

            data.push({
                filename,
                path: imgPath,
                birthtime: stat.birthtime,
                colors: content.hexcodes,
                mainColor: content.hexcodes[0]
            });
        }

        return data;
    }

    public static async loadImg(tag, size, square, sharpen, blur) {

        let imgPath = path.join(__dirname, `../data/${tag}/`);

        if (size !== undefined) imgPath += `${size}${square ? '-square' : ''}`;
        else imgPath += square ? 'square' : 'original';

        imgPath += `${sharpen ? '-sharp' : ''}${blur ? '-blur' : ''}`;

        let buffer;
        try {
            await fs.access(imgPath);
            buffer = fs.readFile(imgPath);
        } catch (e) {
            let original = await fs.readFile(path.join(__dirname, `../data/${tag}/original`));
            buffer = await this.convertImg(original, size, square, sharpen, blur);
            await fs.writeFile(imgPath, buffer);
        }

        return buffer;
    }

    public static async convertImg(buffer, size?: number, square: boolean = false, sharpen: boolean = false, blur: boolean = false) {
        let sharpImg = await sharp(buffer);
        const metadata = await sharpImg.metadata();

        if (square) {
            const targetEdge = Math.min(metadata.width, metadata.height);
            sharpImg = sharpImg
                .extract({
                    left: Math.floor(Math.max(0, (metadata.width - targetEdge) / 2)),
                    top: Math.floor(Math.max(0, (metadata.height - targetEdge) / 2)),
                    width: targetEdge,
                    height: targetEdge
                });
        }
        if (size !== undefined) {
            sharpImg = sharpImg
                .resize(size, null);
        }

        if (metadata.orientation !== undefined) {
            sharpImg = this.applyExifOrientation(metadata.orientation, sharpImg);
        }
        if (sharpen) {
            sharpImg = sharpImg
                .sharpen();
        }
        if (blur) {
            sharpImg = sharpImg
                .blur();
        }
        return await sharpImg
            .toFormat('jpeg', {quality: 100})
            .toBuffer();
    }

    private static applyExifOrientation(orientation, sharpImg) {
        let tmp = sharpImg;

        // noinspection FallThroughInSwitchStatementJS
        switch (orientation) {
            case 2:
                tmp = tmp.flip();
                break;
            case 3:
                tmp = tmp.flip();
            case 4:
                tmp = tmp.flop();
                break;
            case 5:
                tmp = tmp.flip();
            case 6:
                tmp = tmp.rotate(90);
                break;
            case 7:
                tmp = tmp.flip();
            case 8:
                tmp = tmp.rotate(270);
                break;
        }

        return tmp;
    }

}