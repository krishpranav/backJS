const {
    SOCKET_SYMBOL,
    REQUEST_SYMBOL
} = require('./symbols');

const ctx = {
    _reset(message) {
        this.type = 'message';
        this.isComplete = false;
        this.message = message;
    }

    send(...args) {
        this[SOCKET_SYMBOL].send(...args);
        return this;
    }

    get isConnection() {
        return this.type === 'connection';
    }
}