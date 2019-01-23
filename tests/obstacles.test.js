import Obstacles from '../js/obstacles';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
chai.should();

describe('Obstacles Test', () => {
    beforeEach(function() {
        // runs before each test in this block
        Obstacles.prototype.subscribe = function(a, fn){};
        Obstacles.prototype.sortObstacles = function(a, fn){};
        Obstacles.prototype.randomize = function(){ return 8;};
    });

    it('Obstacles should be a function', () => {
        assert.typeOf(Obstacles, 'function', "Obstacles is not a function");
    });

    it('Constructor should make 2 subscribe calls', () => {
        const spy = sinon.spy(Obstacles.prototype, 'subscribe');
        const obstacles = new Obstacles();
        spy.restore();
        sinon.assert.calledTwice(spy);
    });

    it('Constructor should be called with correct values to subscribe', () => {
        const spy = sinon.spy(Obstacles.prototype, 'subscribe');
        const obstacles = new Obstacles();
        spy.restore();
        sinon.assert.calledWith(spy, 'placeInitialObstacles', obstacles.placeInitialObstacles);
        sinon.assert.calledWith(spy, 'placeNewObstacle', obstacles.placeNewObstacle);
    });

    it('Obstacles instance should have getter getObstacles', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.getObstacles, 'array', "getObstacles is a getter and should be an array");
    });

    it('Obstacles instance should have function drawObstacles', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.drawObstacles, 'function', "drawObstacles should be a function");
    });

    it('Obstacles instance should have function placeInitialObstacles', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.placeInitialObstacles, 'function', "placeInitialObstacles should be a function");
    });

    it('Obstacles::placeInitialObstacles should call sortObstacles once', () => {
        const obstacles = new Obstacles();
        const spy = sinon.spy(obstacles, 'sortObstacles');
        obstacles.placeInitialObstacles();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Obstacles::placeInitialObstacles should call placeRandomObstacle at least once', () => {
        const obstacles = new Obstacles();
        const spy = sinon.spy(obstacles, 'placeRandomObstacle');
        obstacles.placeInitialObstacles();
        spy.restore();
        sinon.assert.called(spy);
    });

    it('Obstacles instance should have function placeNewObstacle', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.placeNewObstacle, 'function', "placeNewObstacle should be a function");
    });

    it('Obstacles::placeNewObstacle should call placeRandomObstacle once', () => {
        const obstacles = new Obstacles({mapX:1,mapY:1});
        const spy = sinon.spy(obstacles, 'placeRandomObstacle');
        obstacles.placeNewObstacle(1);
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Obstacles instance should have function placeRandomObstacle', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.placeRandomObstacle, 'function', "placeRandomObstacle should be a function");
    });

    it('Obstacles::placeRandomObstacle should call calculateOpenPosition at least once', () => {
        const obstacles = new Obstacles();
        const spy = sinon.spy(obstacles, 'calculateOpenPosition');
        obstacles.placeRandomObstacle();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Obstacles instance should have function calculateOpenPosition', () => {
        const obstacles = new Obstacles();
        assert.typeOf(obstacles.calculateOpenPosition, 'function', "calculateOpenPosition should be a function");
    });
    
    it('When no collision happens, an object should be returned when Obstacles::calculateOpenPosition is called', () => {
        Obstacles.prototype.hasCollided = sinon.stub().returns(false);
        const obstacles = new Obstacles();
        const retVal = obstacles.calculateOpenPosition();
        retVal.should.be.a('object');
        retVal.should.have.property('x');
        retVal.should.have.property('y');
    });

    it('Obstacles::calculateOpenPosition should call itself when there is a collision', () => {
        const stub = sinon.stub();
        stub.onCall(0).returns(true);
        stub.onCall(1).returns(false);
        Obstacles.prototype.hasCollided = stub;
        const obstacles = new Obstacles();
        const spy = sinon.stub(obstacles, 'calculateOpenPosition');
        obstacles.calculateOpenPosition();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });
});