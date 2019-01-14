import Canvas from '../js/canvas';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;

describe('Canvas Test', () => {

    it('Canvas should be a function', () => {
        assert.typeOf(Canvas, 'function', "Asset is not a function");
    });

    it('Canvas instance should be an object', () => {
        const canvas = new Canvas();
        assert.typeOf(canvas, 'object', 'Canvas should be an object');
    });

    it('Canvas context should have a number of properties', () => {
        const canvas = new Canvas();
        canvas.context.should.have.property('clearRect');
        canvas.context.should.have.property('save');
        canvas.context.should.have.property('restore');
        canvas.context.should.have.property('drawImage');
    });

    it('Canvas instance should have function clearCanvas', () => {
        const canvas = new Canvas();
        assert.typeOf(canvas.clearCanvas, 'function', 'clearCanvas should be a function');
    });

    it('Canvas::clearCanvas should call clearRect once', () => {
        const canvas = new Canvas();
        const spy = sinon.spy(canvas.context, 'clearRect');
        canvas.clearCanvas();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });
});