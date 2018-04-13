import { msgapi } from 'msgapi';

/*
  !serverInfo
  example requring permissions: get information about current server.
  Also uses the internal message API
  returns the information
*/

module.exports = {
    "label": "serverInfo",
    "func": (args) => {
        
    },
    "options": {
        "description": "Get the sum of two arguments",
        "cooldown": 0,
        "needsArgs": false,
        "mustBeOwner": true,
    }
}
