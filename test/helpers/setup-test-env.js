import { JSDOM } from 'jsdom';
import 'mock-local-storage';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

// mock local and session storage
window.localStorage = global.localStorage;

const copyProps = (src, target) => {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

// requestAnimationFrame polyfill
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
