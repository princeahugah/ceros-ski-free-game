const Config = {
    jQuery: require('jquery'),
    _: require('lodash'),
    gameWidth: window.innerWidth,
    gameHeight: window.innerHeight,
    gameStatus: {
        playing: 'Playing',
        start: 'Start',
        paused: 'Paused',
        crashed: 'Crashed'
    },
    collisionAttempts: 5,
    levelCoverage: 2000,
    maxLevels: 5,
    jumpingInterval: 12,
    rhino: {
        defaultSpeed: 6,
        speedFactor: 0.02,
        chaseInterval: 10,
        eatingInterval: 20
    }
};

export default Config;