import * as discord from 'discord.js';

// loaded to get owner ID
const config = require('../config.json');

// predefined commands
const predefinedCommands = ["desc"];

/*
  Command
  Abstract class that handles the existing commands used by the bot
*/
export class Command{
    public label: string;
    public func: (args) => string;
    private description: string;
    private cooldown: number;
    private needsArgs: boolean;
    private roleRequired: string
    private mustBeOwner: boolean;
    
    /*
      Options
      |-description: string // description of the command
      |-cooldown: number // amount of cooldown before it can be executed
      |-needsArgs: bool // does the command require arguments?
      |-roleRequired: string // the role required to execute it
      |-mustBeOwner: bool // (optional) does the user need to be bot owner?
     */
    constructor(label, func, options){
        this.label = label;
        this.func = func;
        this.description = options.descriptions;
        this.cooldown = options.cooldown || 0;
        this.needsArgs = options.needsArgs;
        this.func = func;
        this.roleRequired = options.roleRequired || undefined;
        this.mustBeOwner = options.mustBeOwner || false;
    }

    private permissionCheck(msg): boolean{
        
        // must the user be owner?
        if(this.mustBeOwner){
            // is the user owner?
            if(msg.author.id == config.owner){
                return true;
            }
            return false;
        }
        
        // if there are no perms required, just return true
        if(this.roleRequired == undefined)
            return true;

        // does the user have a given role?
        if(msg.member.roles.has(roleRequired)){
            return true;
        }

        return false;
    }

    // get the description of the given message
    private getDescription(): string{
        return this.description;
    }
    
    // execute the command
    private execute(args): string{
        let result: string = this.func(args);
        return result;
    }

    // send a given message as a response
    private sendMessage(msg, contents): void{
        msg.channel.sendMessage(contents);
    }

    public processCommand(msg, args): void{
        // permissions not met
        if(!this.permissionCheck(msg)){
            this.sendMessage(msg, "You do not have permissions to execute that command.");
            return;
        }
        
        // arguments not met
        if(args.length === 0 && this.needsArgs){
            this.sendMessage(msg, "Command requires arguments.");
            return;
        }

        // all conditions are met on the processing side.
        this.execute(msg, args);
    }
    
}
