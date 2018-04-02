import { Command } from "./command"

/*
  CommandHandler
  Handles the registering and dealing with of commands
  This is what facillitates the modular nature of the bot.
  Commands are not hardcoded, Senjou is simply the core engine for an infinite
  possible number of bots.
*/
export class CommandHandler{
    private commands;

    constructor(){
        this.commands = {};
    }

    /* define a command */
    public defCommand(label, generator, options): void{
        if(this.commands[label]){
            throw new Error("Command " + label + " is already registered.");
        }

        /* create the new command */
        this.commands[label] = new Command(label, generator, options);
    }

    /* execute a given command with the given arguments */
    public execCommand(command: string, args): string{
        return this.commands[command].execute(args);
    }

}
