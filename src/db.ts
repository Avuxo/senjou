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
        mongoose.connect('mongodb://localhost/senjou');

        // create the user schema
        this.userSchema = new mongoose.Schema(
            {
                usedID: 'string'
            });

        // create the guild schema
        this.guildSchema = new mongoose.Schema(
            {
                guildID: 'string'
            });

        // create the models
        this.userModel = mongoose.model('User', this.userSchema);
        this.guildModel = mongoose.model('Guild', this.guildSchema);
    }

    /*Check if a guild exists and if it doesn't, create it*/
    public addGuild(guild): void{
        this.guildModel.findById(guild.id, (err, guild) => {
            if(err) { console.log(err); }
            // server does not previously exist
            if(!guild){
                // create using the predefined schema
                guildModel.create({
                    guildID: guild.id
                }, (err) => { // error creating database
                    console.log(err);
                });
            }
        });
    }

    /*delete a given guild if it exists*/
    public deleteGuild(guildID): void{
        this.guildModel.findById(guildID, (err, guild) => {
            if(err) { console.log(err); }
            if(guild){ // check for guild and remove
                guildModel.remove({guildID: guildID}, (err) => {
                    if(err) { console.log(err); }
                });
            }
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
                    userID: user.id
                }, (err) => { // error creating database
                    console.log(err);
                });
            }
        });
    }

    /*check if a given user exists and if so, delete them*/
    public deleteUser(userID): void{
        this.userModel.findById(userID, (err, user) => {
            if(err) { console.log(err); }
            if(user){
                userModel.remove({userID: userID}, (err) => {
                    if(err) { console.log(err); }
                });
            }
        });
    }

    
}
