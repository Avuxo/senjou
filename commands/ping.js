
/*
  !ping
  Example command showing off the structure of a basic command.
  Simply returns 'pong' when called.
 */

module.exports = {
    "label": "ping",
    "func": (args) => { return "pong"; },
    "options": {
        "description": "Simple command returns 'pong'",
        "cooldown": 0,
        "needsArgs": false,
    }
};
