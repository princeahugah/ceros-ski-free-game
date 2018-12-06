import config from './config';
import FacadeMediator from './facademediator';

const Assets = (function($){
    const assets = {
        'skierCrash' : 'img/skier_crash.png',
        'skierLeft' : 'img/skier_left.png',
        'skierLeftDown' : 'img/skier_left_down.png',
        'skierDown' : 'img/skier_down.png',
        'skierRightDown' : 'img/skier_right_down.png',
        'skierRight' : 'img/skier_right.png',
        'tree' : 'img/tree_1.png',
        'treeCluster' : 'img/tree_cluster.png',
        'rock1' : 'img/rock_1.png',
        'rock2' : 'img/rock_2.png'
    };

    const loadedAssets = {};

    class Assets{
        constructor(){
            this.subscribe('loadAssets', this.resolveAssets);
        }

        get loadedAssets(){
            return loadedAssets;
        }

        loadAssets(){
            var assetPromises = [];
    
            _.each(assets, function(asset, assetName) {
                var assetImage = new Image();
                var assetDeferred = new $.Deferred();
    
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

        resolveAssets(){
            this.loadAssets().then(() => {
                FacadeMediator.publish('placeInitialObstacles');
                requestAnimationFrame(FacadeMediator.gameLoop);
            });
        }
    }

    return Assets;
})(config.jQuery);

export default Assets;