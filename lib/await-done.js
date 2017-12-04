
let _doneCounter = 0;
let _options = null;
let _promise = null;
let callDone = () => {
    _doneCounter = _doneCounter + 1;
    if (!_options) {
        return;
    }
    __callPromise();

    //  console.log(`callDone:${doneCounter}`);
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
    this.callDone = async () => {
        this._doneCounter = _doneCounter + 1;
        if (!_options) {
            return;
        }
        this.__callPromise();
        //  console.log(`callDone:${doneCounter}`);
    }

    this.__callPromise = () => {
        if (this._doneCounter >= this._options.doneAmount) {
            this._doneCounter = 0;
            this._promise.resolve()

        }
    }
    this.done = async (options = { doneAmount: 1 }) => {
        this._options = options;
        return new Promise((resolve, reject) => {
            this._promise = { resolve, reject };
            this.__callPromise();
        });


    }
}

module.exports = {
    callDone,
    done,
    semaphore
};