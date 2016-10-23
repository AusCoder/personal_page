/* global DEBUG */
if (DEBUG) {
	require('debug').enable('*');
}
// require('babel-runtime/core-js/promise').default = require('bluebird');

// this is a nice decorator on function calls, use it like:
//
// import { logger } from 'yw-scripts/debug_config';
// const debug = require('debug')('ServiceName')
// @logger(debug)
// function myFunctionName(someArgs) { .. }

export const logger = (debug) => {
  function wrapper(fn, name) {
    return function (...args) {
      debug(name, ...args);
      return this::fn(...args);
    };
  }
  return function decorator(target, name, descriptor) {
    for (const p of ['get', 'set', 'value']) {
      const fn = descriptor[p];
      if (typeof fn === 'function') {
        descriptor[p] = wrapper(fn, name);
      }
    }
    return descriptor;
  };
};
