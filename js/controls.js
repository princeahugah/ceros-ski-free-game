import config from './config';

export default (function(){
    
    const { jQuery: $, gameStatus } = config;
    let pause = false;
    
    class Controls {
        constructor(user, skier, rhino){
            this.skier = skier;
            this.user = user;
            this.rhino = rhino;
            this.subscribe('initializeControls', this.initialize);
            this.subscribe('localStorage', this.updateScores);
        }

        updateScores(){
            window.localStorage.setItem(this.user.name, JSON.stringify({
                score: Math.ceil(this.skier.mapY),
                speed: Math.ceil(this.skier.speed),
                level: this.skier.level
            }));
        }

        left(){
            if(this.skier.direction === 1) {
                this.skier.mapX -= this.skier.speed;
                this.publish('placeNewObstacle', this.skier.direction);
            }
            else if(this.skier.direction > 1){
                this.skier.direction -= 1;
            }
            else {
                this.skier.direction = 0;
            }

            this.rhino.mapX -= this.rhino.speed;
        }

        right(){
            if(this.skier.direction === 5) {
                this.skier.mapX += this.skier.speed;
                this.publish('placeNewObstacle', this.skier.direction);
            }
            else {
                this.skier.direction += 1;
            }

            this.rhino.mapX += this.rhino.speed;
        }

        up(){
            if(this.skier.direction === 1 || this.skier.direction === 5) {
                this.skier.mapY -= this.skier.speed;
                this.publish('placeNewObstacle', 6);
            }
            else {
                this.skier.jump();
            }

            this.rhino.mapY += this.rhino.speed;
        }

        down(){
            this.skier.direction = 3;
            this.rhino.changeRhinoDirection();
        }

        pause_resume(){
            if(this.isPaused){//resume
                this.skier.direction = 3;
                this.rhino.direction = 1;
                $('section#game-board .status span').html(gameStatus.playing);
            }
            else {//pause
                this.skier.direction = 1;
                this.rhino.direction = 0;
                $('section#game-board .status span').html(gameStatus.paused);
            }
            pause = !pause;
        }

        get isPaused(){
            return pause;
        }

        initialize(){
            $(window).on('keydown', event => {
                if(!this.skier.isSkierBeingEaten){
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
                }
            });

            $(document).on('click', 'ul.notifications li.reset', function(e){
                e.preventDefault();
                window.location.reload();
            });

            $(document).on('click', 'ul.notifications li.rules', function(e){
                e.preventDefault();
                $(this).siblings().find('.notification-menu').css('display', 'none');
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
                $(this).siblings().find('.notification-menu').css('display', 'none');
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
    return Controls;
})();