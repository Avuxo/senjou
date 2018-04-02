import * as mongoose from 'mongoose';


/*
  DB
  Class for communications with the database
*/
export class DB{
    // schemas
    private userSchema: mongoose.Schema;
    private guildSchema: mongoose.Schema;

    // models
    private userModel: mongoose.Model;
    private guildModel: mongoose.Model;
    
    constructor(){
        // connect to the database
        mongoose.connect('mongodb://127.0.0.1:27017/test', (err) => {
            if(err) { console.log(err); }
        });

        // create the user schema
        this.userSchema = new mongoose.Schema(
            {
                user_id: String,
                name: String
            });

        // create the guild schema
        this.guildSchema = new mongoose.Schema(
            {
                guild_id: String,
                name: String
            });

        // create the models
        this.userModel = mongoose.model('User', this.userSchema, 'test');
        this.guildModel = mongoose.model('Guild', this.guildSchema, 'test');
    }

    /*Check if a guild exists and if it doesn't, create it*/
    public addGuild(guild): void{
        this.guildModel.find({guild_id: guild.id}, (err, res) => {
            if(err) { console.log(err); }
            // server does not previously exist
            if(!res){
                // create using the predefined schema
                this.guildModel.update({
                    guild_id: guild.id,
                    name: guild.name
                }, (err) => { // error creating database
                    console.log('fu');
                    console.log(err);
                });
            }
        });
    }

    /*delete a given guild if it exists*/
    public deleteGuild(guild): void{
        this.guildModel.find(guild.id, (err, guild) => {
            if(err) { console.log(err); }
            if(guild){ // check for guild and remove
                guildModel.remove({_id: guild.id}, (err) => {
                    if(err) { console.log(err); }
                });
            }
        });
    }

    /*get a guild with a given ID*/
    public getGuild(guild){
        this.guildModel.find({guild_id: guild.id}, (err, res) => {
            if(err) { console.log(err); }
            if(res) { return res; }
        });
    }

    /*get all guilds in the database*/
    public getAllGuilds(callback){
        this.guildModel.find({}, (err, guilds) => {
            if(err) { console.log(err) }
            if(guilds) { callback(guilds); }
        });
    }
    
    /*add a user if they do not yet exist*/
    public addUser(user): void{
        this.userModel.findById(user.id, (err, user) => {
            if(err) { console.log(err); }

            // server does not previously exist
            if(!user){
                // create using the predefined schema
                userModel.create({
                    _id: user.id
                }, (err) => { // error creating database
                    console.log(err);
                });
            }
        });
    }

    /*check if a given user exists and if so, delete them*/
    public deleteUser(user): void{
        this.userModel.findById(user.id, (err, user) => {
            if(err) { console.log(err); }
            if(user){
                userModel.remove({_id: userID}, (err) => {
                    if(err) { console.log(err); }
                });
            }
        });
    }

    
}
