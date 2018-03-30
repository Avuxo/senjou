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
        mongoose.connect('mongodb://localhost:27017');

        // create the user schema
        this.userSchema = new mongoose.Schema(
            {
                _id: 'string'
            });

        // create the guild schema
        this.guildSchema = new mongoose.Schema(
            {
                _id: 'string'
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
                    _id: guild.id
                }, (err) => { // error creating database
                    console.log(err);
                });
            }
        });
    }

    /*delete a given guild if it exists*/
    public deleteGuild(guild): void{
        this.guildModel.findById(guild.id, (err, guild) => {
            if(err) { console.log(err); }
            if(guild){ // check for guild and remove
                guildModel.remove({_id: guild.id}, (err) => {
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
