import WorkFlowManager from '../js/workflow';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

describe('Workflow Test', () => {
    let FacadeMediator;

    beforeEach(function() {
        // runs before each test in this block
        FacadeMediator = WorkFlowManager.facadeMediator();
    });

    it('WorkFlowManager should be a function', () => {
        assert.typeOf(WorkFlowManager, 'function', "WorkFlowManager is not a function");
    });

    it('Constructor should call subscribe once on FacadeMediator object', () => {
        const spy = sinon.spy(FacadeMediator, 'subscribe');
        const wflow = new WorkFlowManager();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Constructor should be called with correct values to subscribe', () => {
        const spy = sinon.spy(FacadeMediator, 'subscribe');
        const wflow = new WorkFlowManager();
        spy.restore();
        sinon.assert.calledWith(spy, 'onStart', wflow.initialize);
    });

    it('WorkFlowManager should have a static function facadeMediator', () => {
        const w = new WorkFlowManager();
        assert.typeOf(WorkFlowManager.facadeMediator, 'function', "facadeMediator is not a function");
    });

    it('WorkFlowManager instance should have function initialize', () => {
        const w = new WorkFlowManager();
        assert.typeOf(w.initialize, 'function', 'initialize should be a function');
    });

    it('WorkFlowManager::initialize should call window.prompt once', () => {
        const wflow = new WorkFlowManager();
        const stub = sinon.stub(wflow._window, 'prompt').returns('Prince');
        wflow.initialize();
        stub.restore();
        sinon.assert.calledOnce(stub);
    });

    it('WorkFlowManager::initialize function should make 3 publish calls', () => {
        const w = new WorkFlowManager();
        sinon.stub(w._window, 'prompt').returns('Prince');
        const stub = sinon.stub(FacadeMediator, 'publish');
        w.initialize();
        stub.restore();
        sinon.assert.calledThrice(stub);
    });

    it('Constructor should be called with correct values to addUser, initializeControls and loadAssets', () => {
        const w = new WorkFlowManager();
        const stub = sinon.stub(FacadeMediator, 'publish');
        w.initialize();
        stub.restore();
        sinon.assert.calledWith(stub, 'addUser', 'Prince');
        sinon.assert.calledWith(stub, 'initializeControls');
        sinon.assert.calledWith(stub, 'loadAssets', FacadeMediator.gameLoop);
    });

    it('WorkFlowManager instance should have function start', () => {
        const w = new WorkFlowManager();
        assert.typeOf(w.start, 'function', 'start should be a function');
    });

    it('start function should call publish once', () => {
        const stub = sinon.stub(FacadeMediator, 'publish');
        const w = new WorkFlowManager();
        w.start();
        stub.restore();
        sinon.assert.calledOnce(stub);
    });
});