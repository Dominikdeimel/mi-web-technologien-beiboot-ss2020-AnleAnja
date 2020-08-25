async function main(){
    const button = document.getElementById('button');
    button.addEventListener('click', await loadImage());
}

async function loadImage(){
    const request = new Request('http://localhost:3000/random');
    const result = await fetch(request);
    console.log(result);
    // $('.i1').attr('src', `http://localhost:3000/image/${data.image}`);
}


/* async function getQuote(){
    $.get('https://quotes.rest/qod', function ( data ) {
        document.getElementById('quote').innerText = '';
    });
} */

main();