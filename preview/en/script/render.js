var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock( x, y, img ) {
    var image = new Image();
    //inslide block
    //ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    //outline
    image.onload = function() {
        ctx.drawImage(image, BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }
    
    
    //ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    image.src = img;
}

// draws the board and the moving shape
function render() {
    
    ctx.clearRect( 0, 0, W, H );

    //ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                //retain block color
                //ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                var img = foodImages[ board[ y ][ x ] - 1 ];
                //retain shape when landed
                drawBlock( x, y, img );
            }
        }
    }
    
    //ctx.fillStyle = 'red';
    //ctx.strokeStyle = 'black';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                //change color when block lands
                //ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                var img = foodImages[ current[ y ][ x ] - 1 ];
                //draw blocks in general
                drawBlock( currentX + x, currentY + y, img );
            }
        }
    }
    
}

setInterval( render, 150 );