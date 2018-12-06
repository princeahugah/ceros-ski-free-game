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
    levelCoverage: 10000,
    maxLevels: 10
};

export default Config;