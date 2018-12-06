import config from './config';
import FacadeMediator from './facademediator';

const Obstacles = (function($){

    const { _, gameWidth, gameHeight } = config;
    const obstacleTypes = [
        'tree',
        'treeCluster',
        'rock1',
        'rock2'
    ];
    
    class Obstacles {
        constructor(){
            this.initialize();
            this.subscribe('placeInitialObstacles', this.placeInitialObstacles);
            this.subscribe('placeNewObstacle', this.placeNewObstacle);
        }
    
        initialize(){
            this.obstacles = [];
        }

        get getObstacles(){
            return this.obstacles;
        }
    
        drawObstacles(){
            const newObstacles = [];
    
            _.each(this.obstacles, obstacle => {
                const obstacleImage = FacadeMediator.assets.loadedAssets[obstacle.type];
                const x = obstacle.x - FacadeMediator.skier.mapX - obstacleImage.width / 2;
                const y = obstacle.y - FacadeMediator.skier.mapY - obstacleImage.height / 2;
    
                if(x < -100 || x > gameWidth + 50 || y < -100 || y > gameHeight + 50) {
                    return;
                }
    
                FacadeMediator.canvas.context.drawImage(obstacleImage, x, y, obstacleImage.width, obstacleImage.height);
    
                newObstacles.push(obstacle);
            });
    
            this.obstacles = newObstacles;
        }
    
        placeInitialObstacles(){
            const numberObstacles = Math.ceil(_.random(5, 7) * (gameWidth / 800) * (gameHeight / 500));
    
            const minX = -50;
            const maxX = gameWidth + 50;
            const minY = gameHeight / 2 + 100;
            const maxY = gameHeight + 50;
    
            for(let i = 0; i < numberObstacles; i++) {
                this.placeRandomObstacle(minX, maxX, minY, maxY);
            }
            
            this.obstacles = _.sortBy(this.obstacles, obstacle => {
                const obstacleImage = FacadeMediator.assets.loadedAssets[obstacle.type];
                return obstacle.y + obstacleImage.height;
            });
        }
    
        placeNewObstacle(dir){
            const shouldPlaceObstacle = _.random(1, 8);
            if(shouldPlaceObstacle !== 8) {
                return;
            }
    
            const leftEdge = FacadeMediator.skier.mapX;
            const rightEdge = FacadeMediator.skier.mapX + gameWidth;
            const topEdge = FacadeMediator.skier.mapY;
            const bottomEdge = FacadeMediator.skier.mapY + gameHeight;
    
            switch(dir) {
                case 1: // left
                    this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                    break;
                case 2: // left down
                    this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
                    this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                    break;
                case 3: // down
                    this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                    break;
                case 4: // right down
                    this.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                    this.placeRandomObstacle(leftEdge, rightEdge, bottomEdge, bottomEdge + 50);
                    break;
                case 5: // right
                    this.placeRandomObstacle(rightEdge, rightEdge + 50, topEdge, bottomEdge);
                    break;
                case 6: // up
                    this.placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
                    break;
            }
        }
    
        placeRandomObstacle(minX, maxX, minY, maxY) {
            const obstacleIndex = _.random(0, obstacleTypes.length - 1);
    
            const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
    
            this.obstacles.push({
                type : obstacleTypes[obstacleIndex],
                x : position.x,
                y : position.y
            })
        };
    
        calculateOpenPosition(minX, maxX, minY, maxY){
            const x = _.random(minX, maxX);
            const y = _.random(minY, maxY);
    
            const foundCollision = _.find(this.obstacles, obstacle => {
                return x > (obstacle.x - 50) && x < (obstacle.x + 50) && y > (obstacle.y - 50) && y < (obstacle.y + 50);
            });
    
            if(foundCollision) {
                return this.calculateOpenPosition(minX, maxX, minY, maxY);
            }
            else {
                return {
                    x: x,
                    y: y
                }
            }
        }
    }

    return Obstacles;
})(config.jQuery);

export default Obstacles;