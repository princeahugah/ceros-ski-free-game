import Mediator from './mediator';
import config from './config';
import Canvas from './canvas';
import Assets from './assets';
import Skier from './skier';
import Rhino from './rhino';
import Controls from './controls';
import Obstacles from './obstacles';
import User from './user';

export default (function(window) {
    const FacadeMediator = window.FacadeMediator || {};

    FacadeMediator.subscribe = Mediator.subscribe;
    FacadeMediator.publish = Mediator.publish;
    FacadeMediator.installTo = Mediator.installTo;

    FacadeMediator.canvas = new Canvas();

    FacadeMediator.installTo(Assets.prototype);
    FacadeMediator.assets = new Assets();

    FacadeMediator.installTo(Skier.prototype);
    FacadeMediator.skier = new Skier(FacadeMediator.assets, FacadeMediator.canvas.context);

    FacadeMediator.installTo(Rhino.prototype);
    FacadeMediator.rhino = new Rhino(FacadeMediator.assets, FacadeMediator.skier, FacadeMediator.canvas.context);

    FacadeMediator.installTo(User.prototype);
    FacadeMediator.user = new User();

    FacadeMediator.installTo(Controls.prototype);
    FacadeMediator.controls = new Controls(FacadeMediator.user, FacadeMediator.skier, FacadeMediator.rhino);

    FacadeMediator.installTo(Obstacles.prototype);
    FacadeMediator.obstacles = new Obstacles(FacadeMediator.skier, FacadeMediator.assets, FacadeMediator.canvas.context);



    FacadeMediator.gameLoop = function(){
        if(FacadeMediator.skier.totalCollisions === config.collisionAttempts){
            alert('GAME OVER'); //update scores in localstorage
            FacadeMediator.publish('localStorage');
            return;
        }

        if(FacadeMediator.rhino && FacadeMediator.rhino.finishedEatingSkier){
            alert('Awww! You have been eaten by a rhino'); //update scores in localstorage
            FacadeMediator.publish('localStorage');
            return;
        }

        FacadeMediator.canvas.context.save();
        // Retina support
        FacadeMediator.canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);

        FacadeMediator.canvas.clearCanvas();

        if(!FacadeMediator.skier.isSkierBeingEaten){
            FacadeMediator.skier.moveSkier(FacadeMediator.obstacles);
            FacadeMediator.skier.checkIfSkierHitObstacle(FacadeMediator.obstacles);
            FacadeMediator.skier.drawSkier();
        }

        if(FacadeMediator.rhino.isRhinoVisible()){
            FacadeMediator.rhino.drawRhino();
        }

        FacadeMediator.obstacles.drawObstacles();

        FacadeMediator.canvas.context.restore();

        window.requestAnimationFrame(FacadeMediator.gameLoop);
    };

    return FacadeMediator;
})(window);