import config from './config';

export default (function($){
    const assets = {
        'skierCrash' : 'img/skier_crash.png',
        'skierLeft' : 'img/skier_left.png',
        'skierLeftDown' : 'img/skier_left_down.png',
        'skierDown' : 'img/skier_down.png',
        'skierRightDown' : 'img/skier_right_down.png',
        'skierRight' : 'img/skier_right.png',
        'skierJump1' : 'img/skier_jump_1.png',
        'skierJump2' : 'img/skier_jump_2.png',
        'skierJump3' : 'img/skier_jump_3.png',
        'skierJump4' : 'img/skier_jump_4.png',
        'skierJump5' : 'img/skier_jump_5.png',
        'rhinoDefault' : 'img/rhino_default.png',
        'rhinoRunLeft' : 'img/rhino_run_left.png',
        'rhinoRunLeft2' : 'img/rhino_run_left_2.png',
        'rhinoLift' : 'img/rhino_lift.png',
        'rhinoLiftMouthOpen' : 'img/rhino_lift_mouth_open.png',
        'rhinoLiftEat1' : 'img/rhino_lift_eat_1.png',
        'rhinoLiftEat2' : 'img/rhino_lift_eat_2.png',
        'rhinoLiftEat3' : 'img/rhino_lift_eat_3.png',
        'rhinoLiftEat4' : 'img/rhino_lift_eat_4.png',
        'tree' : 'img/tree_1.png',
        'treeCluster' : 'img/tree_cluster.png',
        'rock1' : 'img/rock_1.png',
        'rock2' : 'img/rock_2.png'
    };

    const loadedAssets = {};
    const { _ } = config;

    class Assets{
        constructor(){
            this.subscribe('loadAssets', this.resolveAssets);
        }

        get loadedAssets(){
            return loadedAssets;
        }

        loadAssets(){
            const assetPromises = [];
    
            _.each(assets, (asset, assetName) => {
                const assetImage = new Image();
                const assetDeferred = new $.Deferred();
    
                assetImage.onload = function() {
                    assetImage.width /= 2;
                    assetImage.height /= 2;
    
                    loadedAssets[assetName] = assetImage;
                    assetDeferred.resolve();
                };
                assetImage.src = asset;
    
                assetPromises.push(assetDeferred.promise());
            });
    
            return $.when.apply($, assetPromises);
        }

        resolveAssets(gameLoop){
            this.loadAssets().then(() => {
                this.publish('placeInitialObstacles');
                requestAnimationFrame(gameLoop);
            });
        }
    }

    return Assets;
})(config.jQuery);