const {
    SOCKET_SYMBOL,
    REQUEST_SYMBOL
} = require('./symbols');
  
const ctx = {
    _reset(message) {
      this.type = 'message';
      this.isComplete = false;
      this.message = message;
    },

    send(...args) {
      this[SOCKET_SYMBOL].send(...args);
      return this;
    },

    sendToAll(...args) {
      this.app.send(...args);
      return this;
    },

    done() {
      this.isComplete = true;
      return this;
    },

    throw(err) {
      throw err;
    },

    get isConnection() {
      return this.type === 'connection';
    },

    get isMessage() {
      return this.type === 'message';
    },

    get isClosing() {
      return this.type === 'closing';
    },

    get requestHeaders() {
      return this[REQUEST_SYMBOL].headers;
    },

    get ip() {
      return this[REQUEST_SYMBOL].connection.remoteAddress;
    },
  
    get path() {
      return this[REQUEST_SYMBOL].url;
    },
  
    get method() {
      return this[REQUEST_SYMBOL].method;
    }
};
  
module.exports = (ws, req, app) => Object.assign(Object.create(ctx), {
    app,
    type: 'connection',
    message: null,
    [SOCKET_SYMBOL]: ws,
    [REQUEST_SYMBOL]: req,
});