const process = require('process/');
const { Buffer } = require('buffer');
const EventEmitter = require('events');
if (window) {
  const isLocalhost = window.location.host.indexOf('localhost') >= 0;
  if (!isLocalhost) {
    window.Buffer = Buffer;
    window.process = process;
    window.EventEmitter = EventEmitter;
  }
}
module.exports = { browser: true };
