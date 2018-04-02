import { DB } from './db';
import { Command } from './command';

/*
  Guild
  Class representing a guild in discord to maintain state
  Maintains command cooldowns, database communications etc.
 */

export class Guild{
    /*guild ID and _id in the mongo DB*/
    private id: string;
    private name: string;
    private cooldowns;
    
    constructor(id:string, name:string){
        this.id = id;
        this.name = name;
        this.cooldowns = {};
    }

    /*
      check if a given command requires a cooldown, if so, give it
      label: symbol for function,
      coolodnwAmt: amount of time in ms for cooldown

      return: t: safe to run ; f: still cooling down
    */
    public checkCooldown(label: string, cooldownAmt: number): boolean{
        // get the current time
        let now = Date.now();

        // check if the cooldown is set, if it is not, set it after running
        if(this.cooldowns[label] === undefined || this.cooldowns[label === 0]){
            this.cooldowns[label] = now;
            return true;
        }

        // check if the cooldown is over
        if(this.cooldowns[label] + cooldownAmt < now){
            // reset the cooldown to 0
            this.cooldowns[label] = 0;
            return true;
        }

        // cooldown is not done yet.
        return false;
    }

    /*get the amount of cooldown remaining*/
    public getCooldown(label: string): number{
        if(this.cooldowns[label] === undefined) return 0;
        return this.cooldowns[label];
    }
}
