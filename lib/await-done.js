
const log = require('debug')('await-done')
let _doneCounter = 0;
let _options = null;
let _promise = null;
let callDone = () => {
    _doneCounter = _doneCounter + 1;
    if (!_options) {
        return;
    }
    __callPromise();

    log(`callDone:${_doneCounter}`);
}

const __callPromise = () => {
    if (_doneCounter >= _options.doneAmount) {
        _doneCounter = 0;
        _promise.resolve()

    }
}


let done = (options = { doneAmount: 1 }) => {
    _options = options;
    return new Promise((resolve, reject) => {
        _promise = { resolve, reject };
        __callPromise();
    });


}


let semaphore = function semaphore() {

    this._promise = null;
    this._options = {};
    this._doneCounter = 0;
    this.callDone = () => {
        this._doneCounter = this._doneCounter + 1;
        log('call done called with:', this._doneCounter)
        // console.trace("Here I am!")
        if (!this._options.doneAmount) {
            log('there is no options yet');
            return;
        }
        log(`oprtion is already set`);
        this.__callPromise();
        log(`callDone:${_doneCounter}`);
    }

    this.__callPromise = () => {
        log(`call promise called current counter is ${this._doneCounter} from ${this._options.doneAmount} `);
        if (this._doneCounter >= this._options.doneAmount) {
            // this._doneCounter = 0;
            log(`calling promise resolve. promise is: ${this._promise}`);
            this._promise.resolve()

        }
    }
    this.done = async (options = { doneAmount: 1 }) => {
        this._options = options;

        log(`done :options is set with `, this._options.doneAmount);
        if (this._doneCounter >= this._options.doneAmount) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            this._promise = { resolve, reject };
            //       this.__callPromise();
        });


    }
}

module.exports = {
    callDone,
    done,
    semaphore
};