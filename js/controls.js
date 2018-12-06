import config from './config';
import FacadeMediator from './facademediator';

const { jQuery: $, gameStatus } = config;
let pause = false;

class Controls {
    constructor(){
        this.subscribe('initializeControls', this.initialize);
        this.subscribe('localStorage', this.updateScores);
    }

    updateScores(){
        window.localStorage.setItem(FacadeMediator.user.name, JSON.stringify({
            score: Math.ceil(FacadeMediator.skier.mapY),
            speed: Math.ceil(FacadeMediator.skier.speed),
            level: FacadeMediator.skier.level
        }));
    }

    left(){
        if(FacadeMediator.skier.direction === 1) {
            FacadeMediator.skier.mapX -= FacadeMediator.skier.speed;
            FacadeMediator.publish('placeNewObstacle', FacadeMediator.skier.direction);
        }
        else if(FacadeMediator.skier.direction > 1){
            FacadeMediator.skier.direction -= 1;
        }
        else {
            FacadeMediator.skier.direction = 0;
        }
    }

    right(){
        if(FacadeMediator.skier.direction === 5) {
            FacadeMediator.skier.mapX += FacadeMediator.skier.speed;
            FacadeMediator.publish('placeNewObstacle', FacadeMediator.skier.direction);
        }
        else {
            FacadeMediator.skier.direction += 1;
        }
    }

    up(){
        if(FacadeMediator.skier.direction === 1 || FacadeMediator.skier.direction === 5) {
            FacadeMediator.skier.mapY -= FacadeMediator.skier.speed;
            FacadeMediator.publish('placeNewObstacle', 6);
        }
    }

    down(){
        FacadeMediator.skier.direction = 3;
    }

    pause_resume(){
        if(this.isPaused){
            FacadeMediator.skier.direction = 3;
            $('section#game-board .status span').html(gameStatus.playing);
        }
        else {
            FacadeMediator.skier.direction = 1;
            $('section#game-board .status span').html(gameStatus.paused);
        }
        pause = !pause;
    }

    get isPaused(){
        return pause;
    }

    initialize(){
        $(window).on('keydown', event => {
            switch(event.which) {
                case 37: // left
                    this.left();
                    event.preventDefault();
                    break;
                case 39: // right
                    this.right();
                    event.preventDefault();
                    break;
                case 38: // up
                    this.up();
                    event.preventDefault();
                    break;
                case 40: // down
                    this.down();
                    event.preventDefault();
                    break;
                case 32: // pause
                    this.pause_resume();
                    event.preventDefault();
                    break;
            }
        });

        $(document).on('click', 'ul.notifications li.reset', function(e){
            e.preventDefault();
            window.location.reload();
        });

        $(document).on('click', 'ul.notifications li.rules', function(e){
            e.preventDefault();
            let display = $(this).find('.notification-menu').css('display');
            if(display === 'none'){
                $(this).find('.notification-menu').css('display', 'block');
            }
            else {
                $(this).find('.notification-menu').css('display', 'none');
            }
        });

        $(document).on('click', 'ul.notifications li.board', function(e){
            e.preventDefault();
            let display = $(this).find('.notification-menu').css('display');
            if(display === 'none'){
                $(this).find('.notification-menu').css('display', 'block');
                let tr='';
                for(let i=0; i<localStorage.length; i++){
                    let key = localStorage.key(i);
                    let val = JSON.parse(localStorage.getItem(key));
                    tr += `<tr>
                            <td>${key}</td><td>${val.speed}</td><td>${val.level}</td><td>${val.score}</td>
                        </tr>`;
                }
                $(this).find('table tbody').html(tr);
            }
            else {
                $(this).find('.notification-menu').css('display', 'none');
            }
        });
    }
}

export default Controls;