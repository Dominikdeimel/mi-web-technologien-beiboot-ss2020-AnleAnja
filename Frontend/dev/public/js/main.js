document.addEventListener('DOMContentLoaded', setup, false);

let canvas;
const backendUrl = 'http://192.168.178.50:3000';
const quoteApiUrl = 'http://quotes.rest/qod';
const fontFamily = 'Barlow';

/**
 * @returns {Promise<void>}
 */
async function setup(){
    initializeServiceWorker();
    if(navigator.onLine){
        await drawContent();
    } else {
        const node = document.createElement('span');
        node.innerText = 'Leider sind noch keine Quotes gespeichert';
        document.getElementById('mainPage').appendChild(node);
    }
}

/**
 * @returns {Promise<void>}
 */
async function drawContent(){
    canvas = document.getElementById('myCanvas');

    const imageData = await loadImageData();
    const quote = await loadQuote();
    const image = new Image;
    const ctx = canvas.getContext('2d');

    image.src = `${backendUrl}/image/${imageData.image}`;
    image.onload = async function () {
        ctx.drawImage(image, 0, 0);

        drawGradient(imageData.hexcodes[0].color);
        drawQuote(imageData.hexcodes[0].hsl[2], quote);
    };
}

/**
 * @param {String} primaryImageColor
 * returns {void}
 */
function drawGradient(primaryImageColor){
    const ctx = canvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, canvas.height, 0, canvas.height / 2);

    grd.addColorStop(0, primaryImageColor);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, canvas.height / 2,canvas.width, canvas.height);
}

/**
 * @param {Number} primaryColorLuma
 * @param {Object} quote
 * returns {void}
 */
function drawQuote(primaryColorLuma, quote){
    const ctx = canvas.getContext('2d');
    const fontColor = primaryColorLuma < 0.5 ? '#ffffff' : '#000000';
    ctx.font = `30px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.fillText(quote.text, 10, 600, 380);
    ctx.font = `23px ${fontFamily}`;
    ctx.fillText(`${quote.author} - ${quote.date}`, 50, 700, 380);
}


/**
 * returns {Object}
 */
async function loadImageData(){
    const url = new URL(`${backendUrl}/random?mode=portrait`);
    return fetch(url.toString())
        .then(response => response.json());
}

/**
 * @returns {Promise<{date: *, author: *, text: *} | {date: number, author: string, text: string}>}
 */
async function loadQuote(){
    const request = new Request(quoteApiUrl);
    request.headers.append('Accept', 'application/json');
    const response = await fetch(request);
    if(response.status !== 200){
        return {
            text: 'Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben',
            author: 'Dominik Deimel',
            date: 2089
        };
    } else {
        const body = await response.json();
        return {
            text: body.contents.quotes[0].quote,
            author: body.contents.quotes[0].author,
            date: body.contents.quotes[0].date
        };
    }
}

/**
 * @returns {void}
 */
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered -->', reg);
            }, (err) => {
                console.error('Service worker not registered -->', err);
            });
    }
}