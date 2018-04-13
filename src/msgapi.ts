import { DB } from 'db';

/*
  msgapi
  The message API used internally for messages to get database information;
  abstraction for commands.
*/

class msgapi{
    private db: DB;

    constructor(db: DB){
        this.db = db;
    }

    /*get the information for a given user to be processed by a command*/
    public getUser(user, callback): void{
        this.db.getUser(user, (res) => {
            callback(res);
        });
    }

    /*get guild information to be processed by a command*/
    public getGuild(guild, callback): void{
        this.db.getGuild(guild, (res) => {
            callback(res);
        });
    }
}
