const { expect } = require('chai');
const sinon = require('sinon');
const { callDone, done, semaphore } = require('../lib/async-done');


let counterEvent = null;
let counter = 0;
describe('should-called', () => {
    beforeEach(() => {
        counter = 1;
        counterEvent = sinon.spy();
    });

    it('should-call-once', async () => {
        let intervalId = setInterval(() => {
            console.log(`counter:${counter}`) //counter:1 
            callDone()
            counterEvent()
            counter = counter + 1;
        }, 1000);
        console.log('done');
        await done();
        expect(counterEvent.callCount).to.be.equal(1);
        clearInterval(intervalId)
    }).timeout(2000);

    it('should-call-twice', async () => {
        let intervalId = setInterval(() => {
            console.log(`counter:${counter}`) //counter:1 counter:2
            callDone()
            counter = counter + 1;
            counterEvent()
        }, 100);
        await done({ doneAmount: 2 });
        expect(counterEvent.callCount).to.be.equal(2);
        clearInterval(intervalId)

    }).timeout(1000);
    it('should-call-once with new instance', async () => {
        const _semaphore = new semaphore();

        setTimeout(() => _semaphore.callDone(), 100);
        await _semaphore.done();

    }).timeout(1000);
});
