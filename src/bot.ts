import { Senjou } from './senjou'

// load the config

/*
  config.json
  |-token : string
  |-prefix: string
  |-owner : string
 */
const config = require('../config.json');

// create a bot instance
const bot: Senjou = new Senjou(config);
bot.start();
