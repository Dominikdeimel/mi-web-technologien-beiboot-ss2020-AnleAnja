var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs').promises;
var shortid = require('shortid');
var jimp = require('jimp');

var app = express();
var names = [];

app.use(cors());

app.use(express.raw({
    type: '*/*', limit: "4gb"
}));

app.post('/', function (req, res, next) {

    let id = shortid.generate();
    names.push(id)
    fs.mkdir('data/' + id);
    fs.writeFile('data/' + id + '/' + "original", req.body)
        .then(res.end());

})

app.get('/imagelist', async function (req, res, next) {

    fs.readdir('data/')
        .then(fileList => {
            let openFiles = [];
            for (let i = 0; i < fileList.length; i++) {
                openFiles.push(
                    fs.open(`data/${fileList[i]}/original`, 'r')
                        .then((file) => file.stat()
                            .then((stat) => {
                                file.close();
                                return {
                                    birthtime: stat.birthtime,
                                    filename: fileList[i]
                                }
                            }))
                );
            }
            return Promise.all(openFiles);
        })
        .then((data) => {
            let sortedFiles = data
                .sort((a, b) => a.birthtime - b.birthtime)
                .map(v => v.filename);
            res.send(sortedFiles);
        });
});

app.get('/image/:img/:size', function (req, res, next) {
    let imgParam = req.params.img;
    let sizeParam = parseInt(req.params.size);
    let img = fs.readFile(`data/${imgParam}/original`)
        .then(img => jimp.read(img))
        .then(img => img.resize(sizeParam, jimp.AUTO).getBufferAsync(jimp.MIME_JPEG))
        .then(buffer => {
            fs.writeFile(`data/${imgParam}/${sizeParam}`, buffer)
                .then(res.send(buffer))
        })
        .catch(err => {
            console.error(err);
        });
})

app.get('/image/:img/:size/square', function (req, res, next) {
    let imgParam = req.params.img;
    let sizeParam = parseInt(req.params.size);

    let img = fs.readFile(`data/${imgParam}/original`)
        .then(img => jimp.read(img))
        .then(img => {
            let targetEdge = Math.min(img.getWidth(), img.getHeight());

            return img
                .crop
                (
                    Math.max(0, (img.getWidth() - targetEdge) / 2),
                    Math.max(0, (img.getHeight() - targetEdge) / 2),
                    targetEdge,
                    targetEdge
                )
                .resize(sizeParam, sizeParam)
                .getBufferAsync(jimp.MIME_JPEG);
        })
        .then(buffer => {
            fs.writeFile(`data/${imgParam}/${sizeParam}-square`, buffer)
                .then(res.send(buffer))
        })
        .catch(err => {
            console.error(err);
        });
})

app.delete('/imageList', function (req, res, next) {
    fs.readdir('data')
        .then(directoryList => {
            let promises = [];

            for (let dir of directoryList) {

                let removeDirPromise = fs.readdir(`data/${dir}`)
                    .then(imageDirEntries => {
                        let removePromises = [];

                        for (let imageDirEntry of imageDirEntries) {
                            removePromises.push(fs.unlink(`data/${dir}/${imageDirEntry}`))
                        }

                        return Promise.all(removePromises)
                    })
                    .then(() => fs.rmdir(`data/${dir}`));

                promises.push(removeDirPromise);

            }

            return Promise.all(promises);
        })
        .then(() => {
            res.send("Alle Bilder wurden gelöscht.");
        })
})

app.delete('/imageList/:img', function (req, res, next) {
    let imgParam = req.params.img;
    fs.readdir('data/' + imgParam)
        .then(fileList => {
            let removeFiles = [];
            for (let imgFile of fileList) {
                removeFiles.push(fs.unlink(`data/${imgParam}/${imgFile}`))
            }
            return Promise.all(removeFiles);
        })
        .then(() => fs.rmdir(`data/${imgParam}`))
        .then(() => {
            res.send('Das Bild wurde gelöscht.')
        })
})

app.listen(3000, function () {
    console.log('Listening on port 3000');
});