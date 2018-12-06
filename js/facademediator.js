import Mediator from './mediator';
import config from './config';
import canvas from './canvas';
import Assets from './assets';
import Skier from './skier';
import Controls from './controls';
import Obstacles from './obstacles';
import User from './user';

const FacadeMediator = (function(window, mediator) {
    const FacadeMediator = window.FacadeMediator || {};

    FacadeMediator.subscribe = mediator.subscribe;
    FacadeMediator.publish = mediator.publish;
    FacadeMediator.installTo = mediator.installTo;

    FacadeMediator.canvas = canvas;

    FacadeMediator.installTo(Assets.prototype);
    FacadeMediator.assets = new Assets();

    FacadeMediator.installTo(Skier.prototype);
    FacadeMediator.skier = new Skier();

    FacadeMediator.installTo(Controls.prototype);
    FacadeMediator.controls = new Controls();

    FacadeMediator.installTo(Obstacles.prototype);
    FacadeMediator.obstacles = new Obstacles();

    FacadeMediator.installTo(User.prototype);
    FacadeMediator.user = new User();

    FacadeMediator.gameLoop = function(){
        if(FacadeMediator.skier.totalCollisions === config.collisionAttempts){
            alert('GAME OVER'); //update scores in localstorage
            FacadeMediator.publish('localStorage');
            return;
        }
        FacadeMediator.canvas.context.save();
        // Retina support
        FacadeMediator.canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);

        FacadeMediator.canvas.clearCanvas();

        FacadeMediator.skier.moveSkier(FacadeMediator.obstacles);

        FacadeMediator.skier.checkIfSkierHitObstacle(FacadeMediator.obstacles);

        FacadeMediator.skier.drawSkier();

        FacadeMediator.obstacles.drawObstacles();

        FacadeMediator.canvas.context.restore();

        window.requestAnimationFrame(FacadeMediator.gameLoop);
    };

    return FacadeMediator;
})(window, Mediator);

export default FacadeMediator;