import Skier from '../js/skier';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

describe('Skier Test', () => {
    it('Skier should be a function', () => {
        assert.typeOf(Skier, 'function', "Skier is not a function");
    });

    it('Skier instance should have getter direction', () => {
        const skier = new Skier();
        assert.typeOf(skier.direction, 'number', "direction is a getter and should be a number");
    });

    it('Skier instance should have getter level', () => {
        const skier = new Skier();
        assert.typeOf(skier.level, 'number', "level is a getter and should be a number");
    });

    it('Skier instance should have getter mapX', () => {
        const skier = new Skier();
        assert.typeOf(skier.mapX, 'number', "mapX is a getter and should be a number");
    });

    it('Skier instance should have getter mapY', () => {
        const skier = new Skier();
        assert.typeOf(skier.mapY, 'number', "mapY is a getter and should be a number");
    });

    it('Skier instance should have getter speed', () => {
        const skier = new Skier();
        assert.typeOf(skier.speed, 'number', "speed is a getter and should be a number");
    });

    it('Skier instance should have getSkierAsset method', () => {
        const skier = new Skier();
        assert.typeOf(skier.getSkierAsset, 'function', "getSkierAsset should be a function");
    });

    it('Skier instance should have drawSkier method', () => {
        const skier = new Skier();
        assert.typeOf(skier.drawSkier, 'function', "drawSkier should be a function");
    });

    it('Skier::drawSkier method calls context\'s drawImage method', () => {
        Skier.prototype.getSkierAsset = sinon.stub().returns(0);
        const assets = {
            loadedAssets: [{width: 10, height: 5}]
        };
        const ctx = {
            drawImage: function(){}
        };

        const skier = new Skier(assets, ctx);
        const spy = sinon.spy(ctx, 'drawImage');
        skier.drawSkier();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Skier instance should have moveSkier method', () => {
        const skier = new Skier();
        assert.typeOf(skier.moveSkier, 'function', "moveSkier should be a function");
    });

    it('Skier instance should have checkLevelUpdate method', () => {
        const skier = new Skier();
        assert.typeOf(skier.checkLevelUpdate, 'function', "checkLevelUpdate should be a function");
    });

    it('Skier instance should have intersectRect', () => {
        const skier = new Skier();
        assert.typeOf(skier.intersectRect, 'function', "intersectRect should be a function");
    });

    it('Skier instance should have checkIfSkierHitObstacle method', () => {
        const skier = new Skier();
        assert.typeOf(skier.checkIfSkierHitObstacle, 'function', "checkIfSkierHitObstacle should be a function");
    });

    it('Skier instance should have getter totalCollisions', () => {
        const skier = new Skier();
        assert.typeOf(skier.totalCollisions, 'number', "totalCollisions is a getter and should be a number");
    });

    it('Skier instance should have jump', () => {
        const skier = new Skier();
        assert.typeOf(skier.jump, 'function', "jump should be a function");
    });
});