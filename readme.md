# async-done

a simple semaphore library that allows you to run async unit tests(in libraries like mocha or jest) and call done()


### installation 
```
npm install async-done

```

### usage sample 

using simple function 

```js
const { callDone, done, semaphore } = require('../lib/async-done');
let counter = 0
  it('should-call-once', async () => {
         setInterval(() => {
            console.log(`counter:${counter}`) //counter:1
            callDone()
        }, 100);
        await done();

    }).timeout(1000);

```
it is possible to set the amount until a wait done will be called
```js

let counter = 0
  it('should-call-once', async () => {
        setInterval(() => {
            console.log(`counter:${counter}`) //counter:1 counter:2
            callDone()
            counter = counter+1;
        }, 100);
        await done({ doneAmount: 2 });

    }).timeout(1000);

```

or by creating a new instance 

```js
  it('should-call-once with new instance', async () => {
        const _semaphore = new semaphore();

        setTimeout(() => _semaphore.callDone(), 100);
        await _semaphore.done();

    }).timeout(1000); 

```


