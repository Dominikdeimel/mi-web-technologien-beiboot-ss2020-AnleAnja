import regeneratorRuntime from 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', setup, false);
window.addEventListener('resize', () => resizeWindows().catch(console.error));

let canvas, currentWindowMode, landscapeImageData, portraitImageData, currentImageData;
const backendUrl = 'http://192.168.178.50:3000';
const quoteApiUrl = 'http://quotes.rest/qod';
const fontFamily = 'Barlow';

/**
 * @returns {Promise<void>}
 */
function setup() {
    initializeServiceWorker();
    setWindowMode();
    setCanvasSize();
    if (navigator.onLine) {
        loadImageData()
            .then(() => {
                setCurrentImageData();
                drawContent();
            });
       
    } else {
        renderOfflineImage();
    }
}

function setWindowMode() {
    if(window.innerHeight >= window.innerWidth){
        currentWindowMode = 'portrait';
    } else {
        currentWindowMode = 'landscape';
    }
}

function setCurrentImageData(){
    if(currentWindowMode === 'portrait') {
        currentImageData = portraitImageData;
    } else {
        currentImageData = landscapeImageData;
    }
}

function setCanvasSize(){
    canvas = document.getElementById('myCanvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

async function resizeWindows() {
    setWindowMode();
    setCanvasSize();
    setCurrentImageData();
    await drawContent();
}


/**
 * @returns {void}
 */
async function drawContent() {
    canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const quote = await loadQuote();

    const gradientColor = pickGradientColor(currentImageData.hexcodes);

    const imagePromise = new Promise((resolve) => {
        const image = new Image();
        image.src = `${backendUrl}/image/${currentImageData.image}`;
        image.onload = () => {
            resolve(image);
        };
    });
    const image = await imagePromise;
    const scale = Math.max(canvas.height / image.height, canvas.width / image.width);

    ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);

    drawGradient(gradientColor);
    drawQuote(gradientColor.hsl[2], quote);
}

function pickGradientColor(hexcodes){
    let result = '';
    let difference = 0;

    for(let i = 1; i < hexcodes.length; i++){
        let currentDifference = 0;
        if(hexcodes[0].hsl[2] < hexcodes[i].hsl[2]){
            currentDifference = hexcodes[i].hsl[2] - hexcodes[0].hsl[2];
        } else {
            currentDifference = hexcodes[0].hsl[2] - hexcodes[i].hsl[2];
        }

        if(difference < currentDifference){
            difference = currentDifference;
            result = hexcodes[i];
        }
    }

    return result;
}

/**
 * @param {String} primaryImageColor
 * returns {void}
 */
function drawGradient(primaryImageColor) {
    const ctx = canvas.getContext('2d');
    const grd = currentWindowMode === 'portrait' ? ctx.createLinearGradient(0, canvas.height, 0, canvas.height / 2) : ctx.createLinearGradient(canvas.width, 0, canvas.width / 2,0);

    grd.addColorStop(0, primaryImageColor.color);
    grd.addColorStop(0.7, `rgba(${primaryImageColor.rgb[0]},${primaryImageColor.rgb[1]},${primaryImageColor.rgb[2]},0.4)`);
    grd.addColorStop(1, `rgba(${primaryImageColor.rgb[0]},${primaryImageColor.rgb[1]},${primaryImageColor.rgb[2]},0.1)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * @param {Number} primaryColorLuma
 * @param {Quote} quote
 * returns {void}
 */
function drawQuote(primaryColorLuma, quote) {
    const ctx = canvas.getContext('2d');
    let fontSize = 50;
    const formattedQuote = formatUsingLinebreaks(quote.text, fontSize);
    const fontColor = primaryColorLuma < 0.5 ? '#ffffff' : '#000000';

    let lines = [];
    let width = [];
    for (let i = 0; i < formattedQuote.length; i++) {
        const dimensions = calculateTextDimensions(formattedQuote[i], fontSize);
        lines.push(dimensions);
    }
    for (let i = 0; i < lines.length; i++) {
        width.push(lines[i].width);
    }
    const excess = Math.max(...width) + 200;
    const newWidth = currentWindowMode === 'portrait' ? canvas.width : canvas.width / 3;
    const factor = excess / newWidth;
    if (excess > newWidth) {
        fontSize = fontSize / factor;
        for (let i = 0; i < lines.length; i++) {
            lines[i].height = lines[i].height / factor;
        }
    }

    let count = 0;
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].height + 5;
    }
    let authorX, authorY, dateX, dateY, quoteX, quoteY;
    switch (currentWindowMode) {
        case 'portrait':
            quoteX = canvas.width / 2;
            quoteY = canvas.height / 1.4;
            authorX = canvas.width / 2;
            authorY = canvas.height / 1.1;
            dateX = canvas.width / 2;
            dateY = canvas.height / 1.05;
            break;
        case 'landscape':
            quoteX = canvas.width / 1.25;
            quoteY = canvas.height / 2.5;
            authorX = canvas.width / 1.25;
            authorY = canvas.height / 1.25;
            dateX = canvas.width / 1.25;
            dateY = canvas.height / 1.15;
            break;
    }
    renderMultilineString(lines, quoteX, quoteY, fontColor, fontSize);
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize - 5 < 16 ? 16 : fontSize - 6}pt ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(quote.author, authorX, authorY);
    ctx.font = `${fontSize - 6 < 15 ? 15 : fontSize - 6}pt ${fontFamily}`;
    ctx.fillText(`- ${new Date(quote.date).getFullYear()} -`, dateX, dateY);
}

/**
 *
 * @param { StringWithDimensions[] } lines
 * @param { Number } x
 * @param { Number } y
 * @param { String } textColor
 * @param { Number } fontSize
 */
function renderMultilineString(lines, x, y, textColor, fontSize) {
    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}pt ${fontFamily}`;
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].content, x, y);
        y += lines[i].height + 5;
    }
}

/**
 * @param { String } text
 * @param { Number } fontSize
 * @returns { StringWithDimensions }
 */
function calculateTextDimensions(text, fontSize) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.font = `${fontSize}pt ${fontFamily}`;
    span.style.whiteSpace = 'nowrap';
    document.body.append(span);
    const dimensions = span.getBoundingClientRect();
    document.body.removeChild(span);
    return {content: text, width: dimensions.width, height: dimensions.height};
}

/**
 *
 * @param { String } quoteText
 * @param { Number } fontSize
 * @returns { String[] }
 */
function formatUsingLinebreaks(quoteText, fontSize) {
    const ctx = canvas.getContext('2d');
    const maxLineBreaks = 2;
    const lines = [];
    ctx.font = `${fontSize}pt ${fontFamily}`;
    const textWidth = ctx.measureText(quoteText);

    for (let lineBreak = maxLineBreaks; lineBreak > 0; lineBreak--) {
        // check if the current amount of linebreaks is justified
        const newWidth = currentWindowMode === 'portrait' ? canvas.width : canvas.width / 3;
        if (textWidth.width >= newWidth * lineBreak) {
            // get how many characters are supposed to be in a line
            const charCount = quoteText.length / (lineBreak + 1);
            let lastIndex = 0;
            for (let i = 0; i < lineBreak; i++) {
                // for each target linebreak, replace the closest space with a linebreak
                const spaceIndex = findClosestSpace(quoteText, charCount * (i + 1));
                lines.push(quoteText.substring(lastIndex, spaceIndex));
                lastIndex = spaceIndex + 1;
            }
            lines.push(quoteText.substring(lastIndex));
            // end of function, the quite has been partitioned
            return lines;
        }
    }

    // if the quote needed no change, it is returned as-is
    return [quoteText];
}

/**
 *
 * @param { String } text
 * @param { Number } position
 * @returns { Number }
 * */
function findClosestSpace(text, position) {
    const right = text.indexOf(' ', position);
    const left = text.lastIndexOf(' ', position);
    if (left === -1 || right - position < position - left) {
        return right;
    } else {
        return left;
    }
}

/**
 * returns {Object}
 */
async function loadImageData() {
    let url = new URL(`${backendUrl}/random?mode=portrait`);
    portraitImageData = await fetch(url.toString())
        .then(response => response.json());

    url = new URL(`${backendUrl}/random?mode=landscape`);
    landscapeImageData = await fetch(url.toString())
        .then(response => response.json());
}

/**
 * @returns {Promise<{date: *, author: *, text: *} | {date: number, author: string, text: string}>}
 */
async function loadQuote() {
    const request = new Request(quoteApiUrl);
    request.headers.append('Accept', 'application/json');
    const response = await fetch(request);
    if (response.status === 200 ) {
        const body = await response.json();
        if(body.contents.quotes[0].quote.length <= 150){
            return {
                text: `«${body.contents.quotes[0].quote}»`,
                author: body.contents.quotes[0].author,
                date: body.contents.quotes[0].date
            };
        }
    }
    return {
        text: '«We are not makers of history. We are made by history.»',
        author: 'Martin Luther King Jr.',
        date: '1960-1-1'
    };
}

/**
 * @returns {void}
 */
function renderOfflineImage() {
    canvas = document.getElementById('myCanvas');
    const image = new Image;
    const ctx = canvas.getContext('2d');

    image.src = '/images/offlineImage.png';
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    };
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

/**
 * @typedef {Object} StringWithDimensions
 * @property {String} content
 * @property {Number} width
 * @property {Number} height
 */

/**
 * @typedef {Object} Quote
 * @property {String} text
 * @property {String} author
 * @property {String} date
 */