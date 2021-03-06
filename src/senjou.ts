import * as discord from 'discord.js';
import { Client } from 'discord.js';
import * as glob from 'glob';

import { DB } from './db';
import { CommandHandler } from './commandhandler';
import { Guild } from './guild';

/*
  Senjou
  The main class of the bot
  This is the highest level (non-startup class) and it handles all of the underlying
  bits and pieces involved with the bots
*/
export class Senjou{
    private token: string;
    private prefix: string;
    private presence: string;
    private client: Client;
    private database: DB;
    private commandHandler: CommandHandler;
    private guilds: Guild[];
    
    constructor(config){
        this.token = config.token;
        this.prefix = config.prefix;
        this.presence = config.presence;

        this.database = new DB();

        this.client = new Client(); // init the discord client
        this.client.login(this.token); // login to the discord API
        
        this.commandHandler = new CommandHandler();

        this.guilds = [];
        
        this.loadCommands();
    }

    // load the commands from the modules
    private loadCommands(): void{
        // find all javascript files in commands/
        glob('./commands/*.js', (err, files) => {
            console.log("Loading " + files.length + " commands.");
            if(err) { console.log(err); }
            files.forEach( (file) => {
                // dot is added because it's in the previous dir
                // for the current script, but not the root dir.
                // running npm run dev would put it from ./ instead of
                // ./src
                let command = require('.' + file);
                this.commandHandler.defCommand(command.label,
                                               command.func,
                                               command.options);
            });
            console.log('loaded');
        });
    }
    
    public start(): void{
        // start the bot
        this.client.on("ready", () => {
            // initialize the guild objects for the bot instance
            this.initGuilds();


            
            // set the 'playing' status
            this.client.user.setPresence({game: {name: this.presence, type: 0}});

            
            // print startup time
            console.log("Bot started @ " + this.getTime());
        
        });

        // message in view
        this.client.on("message", (msg) => {
            // get description
            if(msg.content.startsWith(this.prefix + "desc")){
                let command = msg.content.substr(1).split(" ").slice(1);
                let response = this.commandHandler.getDescription(command);
                if(response != undefined) { msg.channel.send(response); }
            // get command
            } else if(msg.content.startsWith(this.prefix)){
                let command = msg.content.substr(1).split(" ");
                let args = command.slice(1);
                args.db = this.database;
                
                // find the guild object where the ID matches.
                let guild = this.guilds.find(g => g.id == msg.guild.id);
                if(guild != undefined && guild.checkCooldown(command, 1000)){
                    let response = this.commandHandler.execCommand(command[0], args);
                    // make sure response is valid.
                    if(response != undefined) { msg.channel.send(response); }
                }
            }
        });

        // join new guild
        this.client.on("guildCreate", (guild) => {
            this.database.addGuild(guild);
        });

        // removed from guild
        this.client.on("guildDelete", (guild) => {
            this.database.deleteGuild(guild);
        });

        
    }

    // initialize the guilds
    private initGuilds(): void{
        this.database.getAllGuilds((guilds) => {
            guilds.forEach((guild) => {
                this.guilds.push(new Guild(guild.guild_id, guild.name));
            })
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

