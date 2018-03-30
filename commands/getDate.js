/*
  !getDate
  A more complex command example showing off something with logic
  returns the current date in d/m/y format
*/

module.exports = {
    "label": "getDate",
    "func": () => {
        let date = new Date();

        // get the current date (d/m/y)
        let day = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

        return day;
    },
    "options": {
        "description": "Get the current date in d/m/y format.",
        "cooldown": 0,
        "needsArgs": false,
    }
};
