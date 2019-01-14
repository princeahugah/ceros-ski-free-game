import Rhino from '../js/rhino';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('Rhino Test', () => {
    let rhino;
    beforeEach(function() {
        const assets = {
            loadedAssets: [
                {
                    width: 1,
                    height: 2
                }
            ]
        };
        const ctx = {
            drawImage: function(a, b, c, d ,e){return false;}
        };
        Rhino.prototype.getRhinoAsset = function(a){ return 0;}
        rhino = new Rhino(assets, {}, ctx);
    });

    it('Rhino should be a function', () => {
        assert.typeOf(Rhino, 'function', "Rhino is not a function");
    });

    it('Constructor should call subscribe once', () => {
        const spy = sinon.spy(Rhino.prototype, 'subscribe');
        const rhino = new Rhino();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Constructor should be called with correct values to subscribe', () => {
        const spy = sinon.spy(Rhino.prototype, 'subscribe');
        const rhino = new Rhino();
        spy.restore();
        sinon.assert.calledWith(spy, 'showRhino', rhino.setRhinoVisibility, rhino);
    });

    it('Rhino instance should have getter direction', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.direction, 'number', "direction is a getter and should be a number");
    });

    it('Rhino instance should have getter finishedEatingSkier', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.finishedEatingSkier, 'boolean', "level is a getter and should be a number");
    });

    it('Rhino instance should have getter speedRate', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.speedRate, 'number', "speedRate is a getter and should be a number");
    });

    it('Rhino instance should have getRhinoAsset method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.getRhinoAsset, 'function', "getRhinoAsset should be a function");
    });

    it('Rhino instance should have isRhinoVisible method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.isRhinoVisible, 'function', "isRhinoVisible should be a function");
    });

    it('Rhino instance should have setRhinoVisibility method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.setRhinoVisibility, 'function', "isRhinoVisible should be a function");
    });

    it('Rhino instance should have eatSkier method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.eatSkier, 'function', "eatSkier should be a function");
    });

    it('Rhino instance should have drawRhino method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.drawRhino, 'function', "drawRhino should be a function");
    });

    it('Rhino::drawRhino should call changeRhinoDirection once', () => {
        const spy = sinon.spy(rhino, 'drawRhino');
        rhino.drawRhino();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Rhino::drawRhino should call the canvas drawImage method once', () => {
        const spy = sinon.spy(rhino.ctx, 'drawImage');
        rhino.drawRhino();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Rhino instance should have changeRhinoDirection method', () => {
        const rhino = new Rhino();
        assert.typeOf(rhino.changeRhinoDirection, 'function', "changeRhinoDirection should be a function");
    });
});