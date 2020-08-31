document.addEventListener('DOMContentLoaded', init, false);
window.onload = function (){
    init();
    main();
};
// eslint-disable-next-line no-unused-vars
async function main(){
    if(navigator.onLine){
        const c = document.getElementById('myCanvas');
        const ctx = c.getContext('2d');

        const imageData = await loadImageData();
        const image = new Image;
        image.src = imageData.imageUrl;

        image.onload = function (){
            ctx.drawImage(image, 0,0);

            const grd = ctx.createLinearGradient(0, c.height, 0, c.height / 2);

            grd.addColorStop(0, imageData.primaryColor.toString());
            grd.addColorStop(1, 'rgba(0,0,0,0)');


            ctx.fillStyle = grd;
            ctx.fillRect(0, 400, 400, 400);




            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben', 10, 600, 380);
            ctx.font = '23px Arial';
            ctx.fillText('Dominik, der schlaue - 2089',50,700,380);
        };
    } else {
        const node = document.createElement('span');
        node.innerText = 'Leider sind noch keine Quotes gespeichert :-(';
        document.getElementById('mainPage').appendChild(node);
    }
}


// eslint-disable-next-line no-unused-vars
async function loadImageData(){
    const url = new URL('http://192.168.178.50:3000/random');
    return fetch(url.toString())
        .then(response => response.json())
        .then(body => {
            return {imageUrl: `http://192.168.178.50:3000/image/${body.image}`, primaryColor: body.hexcodes[0].color};
        });
}
/*
async function loadQuote(){
    /* const request = new Request('http://quotes.rest/qod');
    request.headers.append('Accept', 'application/json');
    fetch(request)
        .then(response => response.json())
        .then(body => {
            const p = document.getElementById('quote');
            p.innerText = body.contents.quotes[0].quote;
        }); 
    const p = document.getElementById('quote');
    p.innerText = 'Ideale sind wie Koks, ein Teil bleibt immer am Geldschein kleben';
    document.getElementById('gradient').classList.add('gradient');
}

*/
function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered -->', reg);
            }, (err) => {
                console.error('Service worker not registered -->', err);
            });
    }

}