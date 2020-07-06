const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const shortid = require('shortid');
const sharp = require('sharp');
const splashy = require('splashy');
const Config = require('./config');
const path = require('path');

const app = express();
const config = new Config();

config.getImageSize('small');

/**
 *
 * @param {string} tag
 * @param {number} size
 * @param {boolean} square
 * @param {boolean} [sharpen]
 * @param {boolean} [blur]
 * @returns {Promise<Buffer>}
 */
async function loadImg(tag, size, square, sharpen, blur) {

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
        buffer = await convertImg(original, size, square, sharpen, blur);
        await fs.writeFile(imgPath, buffer);
    }

    return buffer;
}

/**
 * Takes an image tag and converts it to a JPEG Buffer with the specified properties
 *
 * @param {Buffer} buffer The buffer of the image that should be converted
 * @param {number} [size]
 * @param {boolean} [square]
 * @param {boolean} [sharpen]
 * @param {boolean} [blur]
 * @returns {Promise<Buffer>}
 */
async function convertImg(buffer, size, square, sharpen, blur) {
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
        sharpImg = applyExifOrientation(metadata.orientation, sharpImg);
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

function applyExifOrientation(orientation, sharpImg) {
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

async function imageReader() {

    const fileList = await fs.readdir(path.join(__dirname, '../data/'));
    const data = [];
    for (const filename of fileList) {
        let imgPath = path.join(__dirname, `../data/${filename}/original`);
        let file = await fs.open(imgPath, 'r');
        let buffer = await fs.readFile(imgPath);
        const palette = await splashy(buffer);
        let stat = await file.stat();
        await file.close();

        data.push({
            birthtime: stat.birthtime,
            filename,
            color: palette[0]
        });
    }
    return data
        .sort(() => Math.random() - 0.5);

}

async function chooseSorting(sort) {
    try {
        let images = [];
        if (sort === 'birthtime') {
            images = birthtimeSort(await imageReader());
        } else if (sort === 'alphabetically') {
            images = nameSort(await imageReader());
        } else if (sort === 'random') {
            images = await imageReader();
        } else if (sort === 'colors') {
            images = colorSort(await imageReader());
        }
        return images;
    } catch (e) {
        return e;
    }
}

function birthtimeSort(data) {
    return data
        .sort((a, b) => a.birthtime - b.birthtime)
        .map(v => v.filename);
}

function nameSort(data) {
    return data.sort(function (a, b) {
        let textA = a.filename.toUpperCase();
        let textB = b.filename.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

async function colorSort(data) {
    //color sorting algorithm by Shanfan Huang (https://jsfiddle.net/shanfan/ojgp5718/)
    const colorData = data.map(img => {
        const color = img.color;
        const obj = new Color(color);
        const hsvObj = constructColor(obj);

        return {
            filename: img.filename,
            color: hsvObj
        };
    });
    let sort = sortColorsByHue(colorData);
    //TODO: sortierte Liste mit allen Infos zurückgeben

    return sort;
}

const Color = function Color(hexVal) {
    this.hex = hexVal;
};

function constructColor(colorObj){
    var hex = colorObj.hex.substring(1);
    /* Get the RGB values to calculate the Hue. */
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;

    /* Getting the Max and Min values for Chroma. */
    var max = Math.max.apply(Math, [r, g, b]);
    var min = Math.min.apply(Math, [r, g, b]);


    /* Variables for HSV value of hex color. */
    var chr = max - min;
    var hue = 0;
    var val = max;
    var sat = 0;


    if (val > 0) {
        /* Calculate Saturation only if Value isn't 0. */
        sat = chr / val;
        if (sat > 0) {
            if (r == max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g == max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b == max) {
                hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
        }
    }
    colorObj.chroma = chr;
    colorObj.hue = hue;
    colorObj.sat = sat;
    colorObj.val = val;
    colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
    colorObj.red = parseInt(hex.substring(0, 2), 16);
    colorObj.green = parseInt(hex.substring(2, 4), 16);
    colorObj.blue = parseInt(hex.substring(4, 6), 16);
    return colorObj;
}

function sortColorsByHue (colors) {
    return colors.sort(function (a, b) {
        return a.color.hue - b.color.hue;
    });
}

function chooseAmount(sortedImages, count) {
    if(count >= sortedImages.length){
        return sortedImages;
    }
    else{
        return sortedImages.slice(0, count);
    }
}

async function writeResponse(images) {
    const data = JSON.stringify(images);
    await fs.writeFile(path.join(__dirname, '../imageData.json'), data);
}

app.use(cors());

app.use(express.raw({
    type: '*/*', limit: '4gb'

}));

app.post('/', async function (req, res) {
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
    let buffer = await convertImg(req.body);
    await fs.writeFile(path.join(__dirname, `../data/${id}/original`), buffer);
    res.end();

});

app.get('/imagelist', async function (req, res) {
    res.send(birthtimeSort(await imageReader()));
});

app.get('/image/:tag', async function (req, res) {

    const tagParam = req.params['tag'];
    const sizeParam = req.query['size'];
    const square = 'square' in req.query;
    const sharpen = 'sharpen' in req.query;
    const blur = 'blur' in req.query;
    let size;

    if (sizeParam !== null) {
        size = await config.getImageSize(sizeParam);
    }
    let result;
    try {
        result = await loadImg(tagParam, size, square, sharpen, blur);

    } catch (e) {
        res.sendStatus(404);
        return;
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(result);
});

app.get('/colors/:tag', async function (req, res) {

    const tag = req.params['tag'];
    const originalPath = path.join(__dirname, `../data/${tag}/original`);
    const buffer = await fs.readFile(originalPath);
    const palette = await splashy(buffer);

    const colors = {
        image: tag,
        hexcodes: palette
    };

    const data = JSON.stringify(colors);
    await fs.writeFile(path.join(__dirname, `../data/${tag}/colors.json`), data);

    res.send(palette);
});

app.delete('/imageList', async function (req, res) {
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

app.delete('/imageList/:img', async function (req, res) {
    const {img} = req.params;
    const fileList = await fs.readdir(path.join(__dirname, `../data/${img}`));
    for (const imgFile of fileList) {
        await fs.unlink(path.join(__dirname, `../data/${img}/${imgFile}`));
    }
    await fs.rmdir(path.join(__dirname, `../data/${img}`));
    res.send('image deleted');
});

app.get('/imageData/:sort', async function (req, res) {
    const sort = req.params['sort'];
    const count = req.query['count'];
    const order = req.query['order'];
    let sortedImages;
    let responseImages;
    sortedImages = await chooseSorting(sort);
    if (count !== null) {
        responseImages = await chooseAmount(sortedImages, count);
        if (order === 'desc') {
            responseImages.reverse();
        }
        await writeResponse(responseImages);
    } else {
        responseImages = sortedImages;
        if (order === 'desc') {
            responseImages.reverse();
        }
        await writeResponse(responseImages);
    }

    res.send(responseImages);

    //nach Reihenfolge der Hauptfarbe im Farbkreis
    //API Dokumentation
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});