import config from './config';

export default (function($){
    const { gameStatus, jumpingInterval, maxLevels, gameWidth, gameHeight } = config;
    let { levelCoverage } = config;
    const skierAsset = [
        'skierCrash',
        'skierLeft',
        'skierLeftDown',
        'skierDown',
        'skierRightDown',
        'skierRight',
        'skierJump1',
        'skierJump2',
        'skierJump3',
        'skierJump4',
        'skierJump5'
    ];

    let skierDirection;
    let skierMapX;
    let skierMapY;
    let skierSpeed;
    let totalCollisions = 0;
    let gameLevel;
    let jIntv = jumpingInterval;
    let eatSkier = false;

    class Skier {
    
        constructor(assets, context){
            this.ctx = context;
            this.assets = assets;
            this.setVars();
            $('section#game-board .speed span').html(this.speed);
        }

        setVars(){
            this.direction = 5;
            this.mapX = 0;
            this.mapY = 0;
            this.speed = 8;
            this.level = 1;
            this.jumping = false;
            this.directionBeforeJump = 0;
        }

        get direction(){
            return skierDirection;
        }

        set direction(sd){
            skierDirection = sd;
        }

        get level(){
            return gameLevel;
        }

        set level(lvl){
            gameLevel = lvl;
        }

        get mapX(){
            return skierMapX;
        }

        set mapX(smx){
            skierMapX = smx;
        }

        get mapY(){
            return skierMapY;
        }

        set mapY(smy){
            skierMapY = smy;
        }

        get speed(){
            return skierSpeed;
        }

        set speed(ss){
            skierSpeed = ss;
        }

        getSkierAsset(dir){
            return skierAsset[ dir ];
        }

        set isSkierBeingEaten(eat){
            eatSkier = eat;
        }

        get isSkierBeingEaten(){
            return eatSkier;
        }

        drawSkier(){
            const skierImage = this.assets.loadedAssets[ this.getSkierAsset( this.direction ) ];
            const x = (gameWidth - skierImage.width) / 2;
            const y = (gameHeight - skierImage.height) / 2;
            
            this.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
        }

        moveSkier(o){
            let oldMapY = this.mapY;
            switch(this.direction) {
                case 2:
                    this.jumping = false;
                    this.mapX -= Math.round(this.speed / 1.4142);
                    this.mapY += Math.round(this.speed / 1.4142);
    
                    o.placeNewObstacle(this.direction);
                    break;
                case 3:
                    this.jumping = false;
                    this.mapY += this.speed;
    
                    o.placeNewObstacle(this.direction);
                    break;
                case 4:
                    this.jumping = false;
                    this.mapX += this.speed / 1.4142;
                    this.mapY += this.speed / 1.4142;
    
                    o.placeNewObstacle(this.direction);
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    this.jump();
                    o.placeNewObstacle(this.direction);
                    break;
            }
            this.checkLevelUpdate(oldMapY);
        }

        checkLevelUpdate(oldMapY){
            if(this.mapY > oldMapY){ //if there's a change in distance
                $('section#game-board .status span').html(gameStatus.playing);
                $('section#game-board .score span').html(Math.ceil(this.mapY));
                
                let newLevel = Math.ceil(this.mapY / levelCoverage);
                if(newLevel === (maxLevels + 1)){
                    alert('Woohoo! You won the game.');
                    this.direction = 1;
                    this.publish('localStorage');
                }
                else if(this.level < newLevel){
                    alert('New Level update');
                    this.level = newLevel;
                    $('section#game-board .level span').html(newLevel);
                    levelCoverage += levelCoverage / 2;
                    this.speed += this.speed / 4;
                    if(this.level === (Math.floor(maxLevels/2) + 1)){ //rhino appears after you have played half the game level
                        this.publish('showRhino', true);
                    }
                }
                $('section#game-board .speed span').html(this.speed);
            }
        }

        intersectRect(r1, r2){
            return !(r2.left > r1.right ||
                r2.right < r1.left ||
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
        }

        checkIfSkierHitObstacle(o){
            const skierAssetName = this.getSkierAsset( this.direction );
            const skierImage = this.assets.loadedAssets[skierAssetName];
            const skierRect = {
                left: this.mapX + gameWidth / 2,
                right: this.mapX + skierImage.width + gameWidth / 2,
                top: this.mapY + skierImage.height - 5 + gameHeight / 2,
                bottom: this.mapY + skierImage.height + gameHeight / 2
            };
    
            const collision = _.find(o.getObstacles, obstacle => {
                const obstacleImage = this.assets.loadedAssets[obstacle.type];
                const obstacleRect = {
                    left: obstacle.x,
                    right: obstacle.x + obstacleImage.width,
                    top: obstacle.y + obstacleImage.height - 5,
                    bottom: obstacle.y + obstacleImage.height
                };
    
                return this.intersectRect(skierRect, obstacleRect);
            });
    
            if(collision && !this.jumping) { //ignore collision while jumping
                if(this.direction > 0){
                    totalCollisions++;
                    $('section#game-board .collisions span').html(this.totalCollisions);
                    $('section#game-board .status span').html(gameStatus.crashed);
                }
                this.direction = 0;
            }
        }

        get totalCollisions(){
            return totalCollisions;
        }

        set totalCollisions(col){
            totalCollisions = col;
        }

        jump(){
            if(!this.jumping) { //started jumping
                this.directionBeforeJump = this.direction;
                this.direction = 6;
                this.jumping = true;
                jIntv = jumpingInterval;
            }
            else if(this.jumping && --jIntv === 0){
                this.direction++;
                jIntv = jumpingInterval;
            }
            
            if(this.direction > 10){ //done jumping
                this.direction = this.directionBeforeJump;
                this.jumping = false;
            }
            //jump in the direction of skier movement 
            if(this.directionBeforeJump === 2){
                this.mapX -=  Math.round(this.speed / 2);
            }
            else if(this.directionBeforeJump === 4){
                this.mapX += this.speed / 2;
            }
            this.mapY += this.speed / 2;
        }
    }
    return Skier;
})(config.jQuery);