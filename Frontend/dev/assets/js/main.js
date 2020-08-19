$(document).ready( function(){
    $('button').bind('click', function(){
        console.log(loadImageData());
        $('.i1').attr('src', 'https://www.w3schools.com/w3css/img_snowtops.jpg');
    });
});

function loadImageData(){
    $.get( 'http://localhost:3000/random', function( data ) {
        return data;
    });
}