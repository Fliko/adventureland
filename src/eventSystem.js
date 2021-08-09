export function Events(initialState) {
  this.state = Object.assign({}, initialState, {listeners: {}});
}

Events.prototype.add = function(eventName, callback) {
  this.state.listeners[eventName].push(callback);
}

Events.prototype.remove = function(eventName) {
  this.state.listeners[eventName] = null;
}

Events.prototype.emit = function(eventName) {
  this.state.listeners[eventName].map(callback => callback());
}
