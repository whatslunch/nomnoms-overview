const promise       = require('bluebird');
const pg            = require('pg');
const fs            = promise.promisifyAll(require('fs'));
const {performance} = require('perf_hooks');

let t0 = performance.now();





let t1 = performance.now();
console.log(`elapsed time: ${t1 - t0}`);