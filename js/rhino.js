import config from './config';

export default (function($){
    const { rhino, gameWidth, gameHeight } = config;
    const rhinoAsset = [
        'rhinoDefault',
        'rhinoRunLeft',
        'rhinoRunLeft2',
        'rhinoLift',
        'rhinoLiftMouthOpen',
        'rhinoLiftEat1',
        'rhinoLiftEat2',
        'rhinoLiftEat3',
        'rhinoLiftEat4'
    ];

    let rhinoDirection = 1;
    let chaseInterval = 0;
    let speedInterval = 0;
    let eatingInterval = 0;
    let speed = rhino.defaultSpeed;
    let eatingSkier = false;
    let showRhino = false;
    let eaten = false;

    class Rhino {
        constructor(assets, skier, context){
            this.ctx = context;
            this.assets = assets;
            this.skier = skier;
            this.subscribe('showRhino', this.setRhinoVisibility, this);
        }

        get direction(){
            return rhinoDirection;
        }

        set direction(sd){
            rhinoDirection = sd;
        }

        getRhinoAsset(dir){
            return rhinoAsset[ dir ];
        }

        isRhinoVisible() {
            return showRhino;
        }

        setRhinoVisibility(sr){
            showRhino = sr;
        }

        get finishedEatingSkier(){
            return eaten;
        }

        set finishedEatingSkier(fes){
            eaten = fes;
        }

        eatSkier(){
            if(!eatingSkier){
                this.direction = 3;
                this.skier.direction = 5;
                this.skier.isSkierBeingEaten = true;
                eatingSkier = true;
            }
            if(eatingInterval < rhino.eatingInterval){
                eatingInterval++;
            }
            else if(eatingInterval === rhino.eatingInterval && this.direction < 8){
                this.direction++;
                eatingInterval = 0;
            }
            else {
                //rhino is done eating skier
                this.setRhinoVisibility(false);
                this.finishedEatingSkier = true;
            }
        }

        get speedRate(){
            if(speedInterval < rhino.chaseInterval){
                speedInterval++;
            }
            else if(speedInterval === rhino.chaseInterval && speed.toFixed(2) !== '2.00'){
                speed -= rhino.speedFactor;
                speedInterval = 0;
            }
            else {
                //rhino collides with skier. Start Eating and make skier invisible
                this.eatSkier();
            }
            return speed;
        }

        drawRhino(){
            this.changeRhinoDirection();
            const rhinoImage = this.assets.loadedAssets[ this.getRhinoAsset( this.direction ) ];
            const x = (gameWidth - rhinoImage.width) / 2;
            const y = (gameHeight - rhinoImage.height) / this.speedRate;
            
            this.ctx.drawImage(rhinoImage, x, y, rhinoImage.width, rhinoImage.height);
        }

        changeRhinoDirection(){
            if(!this.isRhinoVisible()){
                return;
            }
            if(chaseInterval < rhino.chaseInterval){
                chaseInterval++;
            }
            else if(chaseInterval === rhino.chaseInterval && this.direction === 1){
                this.direction = 2;
                chaseInterval = 0;
            }
            else if(chaseInterval === rhino.chaseInterval && this.direction === 2){
                this.direction = 1;
                chaseInterval = 0;
            }
        }
    }
    return Rhino;
})(config.jQuery);