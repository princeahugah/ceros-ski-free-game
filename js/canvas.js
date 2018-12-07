import config from './config';

export default (function(){
    
    const { jQuery: $, gameWidth, gameHeight } = config;

    const canvas = $('<canvas></canvas>')
        .attr('width', gameWidth * window.devicePixelRatio)
        .attr('height', gameHeight * window.devicePixelRatio)
        .css({
            width: gameWidth + 'px',
            height: gameHeight + 'px'
        });
        
    const ctx = canvas[0].getContext('2d');

    class Canvas {
        constructor(){
            $('body').append(canvas);
        }

        get context(){
            return ctx;
        }

        clearCanvas() {
            ctx.clearRect(0, 0, gameWidth, gameHeight);
        };
    }

    return Canvas;
})();
