const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const shortid = require('shortid');
const jimp = require('jimp');

const app = express();

async function convertImg(tag, size, square) {
    let img = await fs.readFile(`data/${tag}/original`);
    let jimpImg = await jimp.read(img);
    if (square) {
        let targetEdge = Math.min(jimpImg.getWidth(), jimpImg.getHeight());
        jimpImg = jimpImg.crop(
            Math.max(0, (jimpImg.getWidth() - targetEdge) / 2),
            Math.max(0, (jimpImg.getHeight() - targetEdge) / 2),
            targetEdge,
            targetEdge
        )
            .resize(size, size);
    } else {
        jimpImg = jimpImg.resize(size, jimp.AUTO)
    }
    let buffer = await jimpImg.getBufferAsync(jimp.MIME_JPEG);
    await fs.writeFile(`data/${tag}/${size}${square ? '-square' : ''}`, buffer);
    return buffer;
}

app.use(cors());

app.use(express.raw({
    type: '*/*', limit: "4gb"
}));

app.post('/', async function (req, res, next) {

    let id = shortid.generate();
    fs.mkdir(`data/${id}`);
    await fs.writeFile(`data/${id}/original`, req.body);
    res.end();

})

app.get('/imagelist', async function (req, res, next) {

    let fileList = await fs.readdir('data/');
    let data = [];
    for (let i = 0; i < fileList.length; i++) {
        let file = await fs.open(`data/${fileList[i]}/original`, 'r');
        let stat = await file.stat();
        await file.close();

        data.push({
            birthtime: stat.birthtime,
            filename: fileList[i]
        })
    }
    let sortedFiles = data
        .sort((a, b) => a.birthtime - b.birthtime)
        .map(v => v.filename);
    res.send(sortedFiles);
});

app.get('/image/:img/:size', async function (req, res, next) {
    let imgParam = req.params.img;
    let sizeParam = parseInt(req.params.size);

    let result = await fs.access(`data/${imgParam}/${sizeParam}`)
        .then(() => fs.readFile(`data/${imgParam}/${sizeParam}`))
        .catch(() => convertImg(imgParam, sizeParam, false));
    res.set('Content-Type', jimp.MIME_JPEG);
    res.send(result);
});

app.get('/image/:img/:size/square', async function (req, res, next) {
    let imgParam = req.params.img;
    let sizeParam = parseInt(req.params.size);

    let result = await fs.access(`data/${imgParam}/${sizeParam}-square`)
        .then(() => fs.readFile(`data/${imgParam}/${sizeParam}-square`))
        .catch(() => convertImg(imgParam, sizeParam, true));
    res.set('Content-Type', jimp.MIME_JPEG);
    res.send(result);
});

app.delete('/imageList', async function (req, res, next) {
    let directoryList = await fs.readdir('data');

    for (let dir of directoryList) {

        let imageDirEntries = await fs.readdir(`data/${dir}`)

        for (let imageDirEntry of imageDirEntries) {
            await fs.unlink(`data/${dir}/${imageDirEntry}`);
        }

        await fs.rmdir(`data/${dir}`);

    }
    res.send("Alle Bilder wurden gelöscht.");
});

app.delete('/imageList/:img', async function (req, res, next) {
    let imgParam = req.params.img;
    let fileList = await fs.readdir('data/' + imgParam)
    for (let imgFile of fileList) {
        await fs.unlink(`data/${imgParam}/${imgFile}`);
    }
    await fs.rmdir(`data/${imgParam}`);
    res.send('Das Bild wurde gelöscht.');
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});