var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
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
    fs.mkdirSync('data/' + id);
    fs.writeFileSync('data/' + id + '/' + "original", req.body);
    res.end();

})

app.get('/imagelist', function (req, res, next) {

    let imgs;
    imgs = fs.readdirSync('data');
    res.send(imgs);

})

app.get('/image/:img/:size', function (req, res, next) {
    let imgParam = req.params.img;
    let sizeParam = parseInt(req.params.size);
    let img = fs.readFileSync('data/' + imgParam + '/' + 'original');
    jimp.read(img)
        .then(img => {
            return img
                .resize(sizeParam, jimp.AUTO)
                .getBufferAsync(jimp.MIME_JPEG);
        })
        .then(buffer => {
            fs.writeFileSync('data/' + imgParam + '/' + sizeParam, buffer);
            res.send(buffer);
        })
        .catch(err => {
            console.error(err);
        });
})

app.listen(3000, function () {
    console.log('Listening on port 3000');
});