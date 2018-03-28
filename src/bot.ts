import { Senjou } from './senjou'

// load the config
const config = require('../config.json');

// create a bot instance
const bot: Senjou = new Senjou(config);
bot.start();
