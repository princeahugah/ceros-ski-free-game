import Skier from '../js/skier';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

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

    it('Skier instance should have getSkierAsset', () => {
        const skier = new Skier();
        assert.typeOf(skier.getSkierAsset, 'function', "getSkierAsset should be a function");
    });

    it('Skier instance should have drawSkier', () => {
        const skier = new Skier();
        assert.typeOf(skier.drawSkier, 'function', "drawSkier should be a function");
    });

    it('Skier instance should have moveSkier', () => {
        const skier = new Skier();
        assert.typeOf(skier.moveSkier, 'function', "moveSkier should be a function");
    });

    it('Skier instance should have intersectRect', () => {
        const skier = new Skier();
        assert.typeOf(skier.intersectRect, 'function', "intersectRect should be a function");
    });

    it('Skier instance should have checkIfSkierHitObstacle', () => {
        const skier = new Skier();
        assert.typeOf(skier.checkIfSkierHitObstacle, 'function', "checkIfSkierHitObstacle should be a function");
    });

    it('Skier instance should have getter totalCollisions', () => {
        const skier = new Skier();
        assert.typeOf(skier.totalCollisions, 'number', "totalCollisions is a getter and should be a number");
    });
});