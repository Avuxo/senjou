/*
  !sum
  example witha arguments: get the sum of two given numbers
  returns the sum
*/

module.exports = {
    "label": "sum",
    "func": (args) => {
        if(args.length < 2) return "Not enough arguments.";
        
        let sum = (parseFloat(args[0]) + parseFloat(args[1])) + "";
        if(sum == NaN) return "Invalid sum";

        return sum;
    },
    "options": {
        "description": "Get the sum of two arguments",
        "cooldown": 0,
        "needsArgs": true,
    }
};
