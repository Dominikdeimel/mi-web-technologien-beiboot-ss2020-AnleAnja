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
    let fontSize = 30;
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
    const excess = Math.max(...width) + 40;
    if (excess > canvas.width) {
        const factor = excess / canvas.width;
        fontSize = fontSize / factor;
        for(let i = 0; i < lines.length; i++) {
            lines[i].height = lines[i].height / factor;
        }
    }
    renderMultilineString(lines, canvas.width / 2, 3 * canvas.height / 4, fontColor, fontSize);
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
 * @param { String } quote
 * @param { Number } fontSize
 * @returns { String[] }
 */
function formatUsingLinebreaks(quote, fontSize) {
    const ctx = canvas.getContext('2d');
    const maxLineBreaks = 2;
    const lines = [];
    ctx.font = `${fontSize}pt ${fontFamily}`;
    const textWidth = ctx.measureText(quote);

    for (let lineBreak = maxLineBreaks; lineBreak > 0; lineBreak--) {
        // check if the current amount of linebreaks is justified
        if (textWidth.width >= canvas.width * lineBreak) {
            // get how many characters are supposed to be in a line
            const charCount = quote.length / (lineBreak + 1);
            let lastIndex = 0;
            for (let i = 0; i < lineBreak; i++) {
                // for each target linebreak, replace the closest space with a linebreak
                const spaceIndex = findClosestSpace(quote, charCount * (i + 1));
                lines.push(quote.substring(lastIndex, spaceIndex));
                lastIndex = spaceIndex + 1;
            }
            lines.push(quote.substring(lastIndex));
            // end of function, the quite has been partitioned
            return lines;
        }
    }

    // if the quote needed no change, it is returned as-is
    return [quote];
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
            text: 'Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben',
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

/**
 * @typedef {Object} StringWithDimensions
 * @property {String} content
 * @property {Number} width
 * @property {Number} height
 */