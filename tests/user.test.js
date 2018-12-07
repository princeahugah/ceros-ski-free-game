import User from '../js/user';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

describe('User Test', () => {
    beforeEach(function() {
        // runs before each test in this block
        User.prototype.subscribe = function(a, fn){};
    });

    it('Constructor should call subscribe once', () => {
        const spy = sinon.spy(User.prototype, 'subscribe');
        const user = new User();
        spy.restore();
        sinon.assert.calledOnce(spy);
    });

    it('Constructor should be called with correct values to subscribe', () => {
        const spy = sinon.spy(User.prototype, 'subscribe');
        const user = new User();
        spy.restore();
        sinon.assert.calledWith(spy, 'addUser', user.addUser);
    });

    it('User should be a function', () => {
        assert.typeOf(User, 'function', "User is not a function");
    });

    it('User instance should be an object', () => {
        const user = new User();
        assert.typeOf(user, 'object', 'User should be an object');
    });

    it('User instance should have function addUser', () => {
        const user = new User();
        assert.typeOf(user.addUser, 'function', 'addUser should be a function');
    });
});