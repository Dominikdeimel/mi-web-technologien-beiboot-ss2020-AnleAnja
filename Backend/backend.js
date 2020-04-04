var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var shortid = require('shortid');

var app = express();
var names = [];

app.use(cors());

app.use(express.raw({
    type: '*/*', limit: "4gb"
}));

app.post('/', function (req, res, next) {

    let id = shortid.generate() + '.jpg';
    names.push(id)
    fs.writeFileSync('data/' + id, req.body);
    res.end();
    
})

app.get('/imagelist', function (req, res, next) {

    let imgs;
    imgs = fs.readdirSync('data');
    res.send(imgs);

})

app.get('/image/:img', function(req, res, next){
    let img;
    img = fs.readFileSync('data/' + req.params.img);
    res.send(img);
})

app.listen(3000, function () {
    console.log('Listening on port 3000');
});