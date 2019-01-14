import Controls from '../js/controls';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

describe('Controls Test', () => {
    beforeEach(function() {
        // runs before each test in this block
        Controls.prototype.subscribe = function(a, fn){};
    });

    it('Controls should be a function', () => {
        assert.typeOf(Controls, 'function', "Controls is not a function");
    });

    it('Constructor should make 2 subscribe calls', () => {
        const spy = sinon.spy(Controls.prototype, 'subscribe');
        const controls = new Controls();
        spy.restore();
        sinon.assert.calledTwice(spy);
    });

    it('Constructor should be called with correct values to initializeControls and localStorage', () => {
        const spy = sinon.spy(Controls.prototype, 'subscribe');
        const controls = new Controls();
        spy.restore();
        sinon.assert.calledWith(spy, 'initializeControls', controls.initialize);
        sinon.assert.calledWith(spy, 'localStorage', controls.updateScores);
    });

    it('Controls instance should have function initialize', () => {
        const controls = new Controls();
        assert.typeOf(controls.initialize, 'function', "initialize should be a function");
    });

    it('Controls instance should have function updateScores', () => {
        const controls = new Controls();
        assert.typeOf(controls.updateScores, 'function', "updateScores should be a function");
    });

    it('Controls instance should have function left', () => {
        const controls = new Controls();
        assert.typeOf(controls.left, 'function', "left should be a function");
    });

    it('Controls instance should have function right', () => {
        const controls = new Controls();
        assert.typeOf(controls.right, 'function', "right should be a function");
    });

    it('Controls instance should have function up', () => {
        const controls = new Controls();
        assert.typeOf(controls.up, 'function', "up should be a function");
    });

    it('Controls instance should have function down', () => {
        const controls = new Controls();
        assert.typeOf(controls.down, 'function', "down should be a function");
    });

    it('Controls instance should have function pause_resume', () => {
        const controls = new Controls();
        assert.typeOf(controls.pause_resume, 'function', "pause_resume should be a function");
    });

    it('Controls instance should have getter isPaused', () => {
        const controls = new Controls();
        assert.typeOf(controls.isPaused, 'boolean', "isPaused is a getter and should be boolean");
    });
});