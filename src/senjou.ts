import * as discord from 'discord.js';
import { Client } from 'discord.js';

import { DB } from './db';
import { CommandHandler } from './commandhandler';
/*
  Senjou
  The main class of the bot
  This is the highest level (non-startup class) and it handles all of the underlying
  bits and pieces involved with the bots
*/
export class Senjou{
    private token: string;
    private prefix: string;
    private client: Client;
    private database: DB;
    private commandHandler: CommandHandler;
    
    constructor(config){
        this.token = config.token;
        this.prefix = config.prefix;

        this.database = new DB();

        this.client = new Client(); // init the discord client
        this.client.login(this.token); // login to the discord API

        this.commandHandler = new CommandHandler();
    }

    // load the commands from the modules
    private loadCommands(): void{
        
    }
    
    public start(): void{
        // start the bot
        this.client.on("ready", () => {
            // print startup time
            console.log("Bot started @ " + this.getTime());
        
        });
    }

    // get the time & date at invocation
    public getTime(): string{
        let date: Date = new Date();
        // get the current time
        let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        // get the current date (d/m/y)
        let day = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

        return time + " " + day;

    }


}

