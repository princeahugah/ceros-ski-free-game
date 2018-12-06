const readonly = function(target, key, descriptor){
    descriptor.writable = false;
    return descriptor;
};

const assets = function(target){
    target.skierCrash = 'img/skier_crash.png';
    target.skierLeft = 'img/skier_left.png';
    target.skierLeftDown = 'img/skier_left_down.png';
    target.skierDown = 'img/skier_down.png';
    target.skierRightDown = 'img/skier_right_down.png';
    target.skierRight = 'img/skier_right_down.png';
    target.tree = 'img/tree_1.png';
    target.treeCluster = 'img/tree_cluster.png';
    target.rock1 = 'img/rock_1.png';
    target.rock2 = 'img/rock_2.png';
};

const loadedAssets = {};

const obstacleTypes = [
    'tree',
    'treeCluster',
    'rock1',
    'rock2'
];

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;
const canvas = $('<canvas></canvas>')
    .attr('width', gameWidth * window.devicePixelRatio)
    .attr('height', gameHeight * window.devicePixelRatio)
    .css({
        width: gameWidth + 'px',
        height: gameHeight + 'px'
    });
$('body').append(canvas);
const ctx = canvas[0].getContext('2d');

const skierDirection = 5;
const skierMapX = 0;
const skierMapY = 0;
const skierSpeed = 8;

//return a singleton
export default {
    readonly
};