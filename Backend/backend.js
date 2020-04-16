const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const shortid = require('shortid');
const sharp = require('sharp');
const splashy = require('splashy');

const app = express();

/**
 *
 * @param {string} tag
 * @param {number} size
 * @param {boolean} square
 * @returns {Promise<Buffer>}
 */
async function loadImg(tag, size, square) {

    let path = `data/${tag}/`;

    await fs.access(path);

    if (size !== undefined) path += `${size}${square ? '-square' : ''}`;
    else path += square ? `square` : `original`;

    let buffer;
    try {
        await fs.access(path);
        buffer = fs.readFile(path);
    } catch (e) {
        let original = await fs.readFile(`data/${tag}/original`);
        buffer = await convertImg(original, size, square);
        await fs.writeFile(path, buffer);
    }

    return buffer;
}

/**
 * Takes an image tag and converts it to a JPEG Buffer with the specified properties
 *
 * @param {Buffer} buffer The buffer of the image that should be converted
 * @param {number} [size]
 * @param {boolean} [square]
 * @returns {Promise<Buffer>}
 */
async function convertImg(buffer, size, square) {
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

    if(metadata.orientation !== undefined)
    {
        sharpImg = applyExifOrientation(metadata.orientation, sharpImg);
    }

    return await sharpImg.toBuffer();
}

function applyExifOrientation(orientation, sharpImg)
{
    let tmp = sharpImg;

    // noinspection FallThroughInSwitchStatementJS
    switch(orientation)
    {
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

app.use(cors());

app.use(express.raw({
    type: '*/*', limit: '4gb'
}));

app.post('/', async function (req, res) {
    try {
        await sharp(req.body);
    } catch (err) {
        res.sendStatus(415);
        return;
    }
    let id = shortid.generate();
    await fs.mkdir(`data/${id}`);
    let buffer = await convertImg(req.body);
    await fs.writeFile(`data/${id}/original`, buffer);
    res.end();

});

app.get('/imagelist', async function (req, res) {

    const fileList = await fs.readdir('data/');
    const data = [];
    for (const filename of fileList) {
        let file = await fs.open(`data/${filename}/original`, 'r');
        let stat = await file.stat();
        await file.close();

        data.push({
            birthtime: stat.birthtime,
            filename
        });
    }
    let sortedFiles = data
        .sort((a, b) => a.birthtime - b.birthtime)
        .map(v => v.filename);
    res.send(sortedFiles);
});

app.get('/image/:tag', async function (req, res) {

    const tagParam = req.params['tag'];
    const sizeParam = req.query['size'];
    const square = 'square' in req.query;
    let size;

    if (sizeParam !== null) {
        size = parseInt(sizeParam);

        if (isNaN(size)) {
            res.status(400);
            res.send('path is /image/[img: string]/[size: integer]/square');
            res.end();
            return;
        }
    }
    let result;
    try {
        result = await loadImg(tagParam, size, square);
    } catch (e) {
        res.sendStatus(404);
        return;
    }
    res.send(result);
});

app.get('/colors/:tag', async function (req, res) {

    const tag = req.params['tag'];
    const path = `data/${tag}/original`;
    const buffer = await fs.readFile(path);
    const palette = await splashy(buffer);

    const colors = {
        image: tag,
        hexcodes: palette
    };

    const data = JSON.stringify(colors);
    await fs.writeFile(`data/${tag}/colors.json`, data);

    res.send(palette);
});

app.delete('/imageList', async function (req, res) {
    const directoryList = await fs.readdir('data');

    for (const dir of directoryList) {

        const imageDirEntries = await fs.readdir(`data/${dir}`);

        for (const imageDirEntry of imageDirEntries) {
            await fs.unlink(`data/${dir}/${imageDirEntry}`);
        }

        await fs.rmdir(`data/${dir}`);

    }
    res.send('all images deleted');
});

app.delete('/imageList/:img', async function (req, res) {
    const {img} = req.params;
    const fileList = await fs.readdir(`data/${img}`);
    for (const imgFile of fileList) {
        await fs.unlink(`data/${img}/${imgFile}`);
    }
    await fs.rmdir(`data/${img}`);
    res.send('image deleted');
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});