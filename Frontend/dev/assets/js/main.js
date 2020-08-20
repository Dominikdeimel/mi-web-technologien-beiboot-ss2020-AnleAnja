$(document).ready( function(){
    $('button').bind('click', function(){
        $.get( 'http://localhost:3000/random', function( data ) {
            console.log(data);
            $('.i1').attr('src', `http://localhost:3000/image/${data.image}`);
        });
    });
});