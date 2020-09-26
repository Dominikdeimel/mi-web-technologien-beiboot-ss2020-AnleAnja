import regeneratorRuntime from 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', setup, false);
window.addEventListener('resize', () => resizeWindows().catch(console.error));

let canvas, currentWindowMode, landscapeImageData, portraitImageData, currentImageData, quoteFontSize, dateAuthorFontSize;
const backendUrl = 'https://beibootapi.herokuapp.com';
const quoteApiUrl = 'https://quotes.rest/qod';
const fontFamily = 'Barlow Regular';

/**
 * @returns {Promise<void>}
 */
async function setup() {
    setWindowMode();
    await loadImageData();
    setCurrentImageData();
    drawContent();
}

/**
 * @returns {Promise<void>}
 */
async function resizeWindows() {
    setWindowMode();
    setCurrentImageData();
    await drawContent();
}

/**
 * @returns {void}
 */
function setWindowMode() {
    canvas = document.getElementById('myCanvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    currentWindowMode = window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * @returns {void}
 */
function setCurrentImageData(){
    currentImageData = currentWindowMode === 'portrait' ? portraitImageData : landscapeImageData;
}

/**
 * @returns {void}
 */
async function loadImageData() {
    const portraitUrl = new URL(`${backendUrl}/random?mode=portrait`);
    const landscapeUrl = new URL(`${backendUrl}/random?mode=landscape`);

    portraitImageData = await (await fetch(portraitUrl.toString())).json();
    landscapeImageData = await (await fetch(landscapeUrl.toString())).json();
}
/**
 * @returns {void}
 */
async function drawContent() {
    canvas = document.getElementById('myCanvas');

    const ctx = canvas.getContext('2d');
    const quote = await loadQuote();
    const gradientColor = pickGradientColor(currentImageData.hexcodes);
    const gradientColorLuma = gradientColor.hsl[2];
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
    drawQuote(gradientColorLuma, quote);
}

/**
 * @returns {Promise<{text: *, author: *} | {text: string, author: string}>}
 */
async function loadQuote() {
    const request = new Request(quoteApiUrl);
    request.headers.append('Accept', 'application/json');

    const response = await fetch(request);
    if (response.status === 200 ) {
        const body = await response.json();
        const quoteLength = body.contents.quotes[0].quote.length;

        if(quoteLength <= 150 && quoteLength >= 40){
            return {
                text: `«${body.contents.quotes[0].quote}»`,
                author: body.contents.quotes[0].author || 'Unbekannt'
            };
        }
    }
    return {
        text: '«We are not makers of history. We are made by history.»',
        author: 'Martin Luther King Jr.'
    };
}

/**
 *
 * @param {Array<VibrantColorObject>} hexcodes
 * @returns {string}
 */
function pickGradientColor(hexcodes){
    let result = '';
    let difference = 0;

    for(let i = 1; i < hexcodes.length; i++){
        const currentDifference = hexcodes[0].hsl[2] < hexcodes[i].hsl[2]
            ? hexcodes[i].hsl[2] - hexcodes[0].hsl[2]
            : hexcodes[0].hsl[2] - hexcodes[i].hsl[2];

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
    const grd = currentWindowMode === 'portrait'
        ? ctx.createLinearGradient(0, canvas.height, 0, canvas.height / 2)
        : ctx.createLinearGradient(canvas.width, 0, canvas.width / 2,0);

    grd.addColorStop(0, primaryImageColor.color);
    grd.addColorStop(0.8, `rgba(${primaryImageColor.rgb[0]},${primaryImageColor.rgb[1]},${primaryImageColor.rgb[2]},0.4)`);
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
    setFontSize(quote);
    const formattedQuote = formatUsingLinebreaks(quote.text);
    const fontColor = primaryColorLuma < 0.5 ? '#ffffff' : '#000000';

    const lines = formattedQuote.map(it => calculateTextDimensions(it));
    const width = lines.map(it => it.width);

    const excess = Math.max(...width) + 200;
    const maxWidth = currentWindowMode === 'portrait' ? canvas.width : canvas.width / 3;
    const factor = excess / maxWidth;
    if (excess > maxWidth) {
        quoteFontSize = findNearestRenardNumber(quoteFontSize / factor);
        lines.map(it => it.height /= factor);
    }

    let authorX, authorY, dateX, dateY, quoteX, quoteY;
    switch (currentWindowMode) {
        case 'portrait':
            quoteX = canvas.width / 2;
            quoteY = canvas.height / 1.5;
            authorX = canvas.width / 2;
            authorY = canvas.height / 1.1;
            dateX = canvas.width / 2;
            dateY = canvas.height / 9;
            break;
        case 'landscape':
            quoteX = canvas.width / 1.25;
            quoteY = canvas.height / 2.3;
            authorX = canvas.width / 1.25;
            authorY = canvas.height / 1.1;
            dateX = canvas.width / 1.25;
            dateY = canvas.height / 8;
            break;
    }

    renderMultilineString(lines, quoteX, quoteY, fontColor);

    ctx.fillStyle = fontColor;
    ctx.font = `${dateAuthorFontSize}pt ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(quote.author, authorX, authorY);

    const currentDate = new Date().toLocaleString('de-DE', {year: 'numeric', month: 'long', day: 'numeric'});
    ctx.fillText(`-- ${currentDate} --`, dateX, dateY);
}

/**
 * @param {Quote}quote
 * @returns {void}
 */
function setFontSize(quote) {
    const quoteLength = quote.text.length;
    switch (currentWindowMode) {
        case 'portrait': {
            if(quoteLength < 60) {
                quoteFontSize = 35;
                dateAuthorFontSize = 20;
            } else if(quoteLength >= 60 && quoteLength < 80) {
                quoteFontSize = 30;
                dateAuthorFontSize = 20;
            } else if(quoteLength >= 80 && quoteLength < 100) {
                quoteFontSize = 28;
                dateAuthorFontSize = 20;
            } else if (quoteLength >= 100 && quoteLength < 120) {
                quoteFontSize = 25;
                dateAuthorFontSize = 20;
            } else if (quoteLength >= 120 && quoteLength < 140) {
                quoteFontSize = 22;
                dateAuthorFontSize = 20;
            } else if (quoteLength >= 150 ) {
                quoteFontSize = 20;
                dateAuthorFontSize = 20;
            }
            break;
        }
        case 'landscape': {
            if(quoteLength < 60) {
                quoteFontSize = 55;
                dateAuthorFontSize = 18;
            } else if(quoteLength >= 60 && quoteLength < 80) {
                quoteFontSize = 50;
                dateAuthorFontSize = 18;
            } else if(quoteLength >= 80 && quoteLength < 100) {
                quoteFontSize = 45;
                dateAuthorFontSize = 18;
            } else if (quoteLength >= 100 && quoteLength < 120) {
                quoteFontSize = 40;
                dateAuthorFontSize = 18;
            } else if (quoteLength >= 120 && quoteLength < 140) {
                quoteFontSize = 35;
                dateAuthorFontSize = 18;
            } else if (quoteLength >= 150) {
                quoteFontSize = 30;
                dateAuthorFontSize = 18;
            }
            break;
        }
    }
}

/**
 *
 * @param { String } quoteText
 * @returns { String[] }
 */
function formatUsingLinebreaks(quoteText) {
    const ctx = canvas.getContext('2d');
    ctx.font = `${quoteFontSize}pt ${fontFamily}`;
    const textWidth = ctx.measureText(quoteText);
    const maxWidth = currentWindowMode === 'portrait' ? canvas.width : canvas.width / 3;
    const maxLineBreaks = 3, lines = [];

    for (let lineBreak = maxLineBreaks; lineBreak > 0; lineBreak--) {
        if (textWidth.width >= maxWidth * lineBreak) {
            const charCount = quoteText.length / (lineBreak + 1);
            let lastIndex = 0;
            for (let i = 0; i < lineBreak; i++) {
                const spaceIndex = findClosestSpace(quoteText, charCount * (i + 1));
                lines.push(quoteText.substring(lastIndex, spaceIndex));
                lastIndex = spaceIndex + 1;
            }
            lines.push(quoteText.substring(lastIndex));
            return lines;
        }
    }
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
 * @param { String } text
 * @returns { StringWithDimensions }
 */
function calculateTextDimensions(text) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.font = `${quoteFontSize}pt ${fontFamily}`;
    span.style.whiteSpace = 'nowrap';

    document.body.append(span);
    const dimensions = span.getBoundingClientRect();
    document.body.removeChild(span);

    return {content: text, width: dimensions.width, height: dimensions.height};
}

/**
 *
 * @param {number} value
 * @returns {number}
 */
function findNearestRenardNumber(value){
    const renardNumbers = [12,14,16,18,20,22,25,28,30,35,40,45,50,55];

    value = Math.floor(value);
    while(!renardNumbers.includes(value) && value > 12){
        value--;
    }
    return value;
}

/**
 *
 * @param { StringWithDimensions[] } lines
 * @param { Number } x
 * @param { Number } y
 * @param { String } fontColor
 * @returns {void}
 */
function renderMultilineString(lines, x, y, fontColor) {
    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.fillStyle = fontColor;
    ctx.font = `${quoteFontSize}pt ${fontFamily}`;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].content, x, y);
        y += lines[i].height + 5;
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
 */

/**
 * @typedef {Object} VibrantColorObject
 * @property {String} name
 * @property {String} color
 * @property {Number} population
 * @property {Array<number>} rgb
 * @property {Array<number>} hsl
 */