import Assets from '../js/assets';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

describe('Assets Test', () => {
    beforeEach(function() {
        // runs before each test in this block
        Assets.prototype.subscribe = function(a, fn){};
    });

    it('Assets should be a function', () => {
        assert.typeOf(Assets, 'function', "Asset is not a function");
    });

    it('Constructor should subscribe to loadAssets once', () => {
        const spy = sinon.spy(Assets.prototype, 'subscribe');
        const asset = new Assets();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Constructor should be called with correct values to subscribe', () => {
        const spy = sinon.spy(Assets.prototype, 'subscribe');
        const asset = new Assets();
        spy.restore();
        sinon.assert.calledWith(spy, 'loadAssets', asset.resolveAssets);
    });

    it('Assets instance should have getter loadedAssets', () => {
        const assets = new Assets();
        assert.typeOf(assets.loadedAssets, 'object', "loadedAssets is a getter and should be an object");
    });

    it('Assets instance should have function loadAssets', () => {
        const assets = new Assets();
        assert.typeOf(assets.loadAssets, 'function', "loadAssets should be a function");
    });

    it('Assets::loadAssets should return an object', () => {
        const assets = new Assets();
        assets.loadAssets().should.be.an('object');
    });

    it('Assets instance should have function resolveAssets', () => {
        const assets = new Assets();
        assert.typeOf(assets.resolveAssets, 'function', "resolveAssets should be a function");
    });

    it('Assets::resolveAssets should call loadAssets once', () => {
        const asset = new Assets();
        const spy = sinon.spy(asset, 'loadAssets');
        let gameLoop = function(){};
        asset.resolveAssets(gameLoop);
        spy.restore();
        sinon.assert.calledOnce(spy);
    });
});