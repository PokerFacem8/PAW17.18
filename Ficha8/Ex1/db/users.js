const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    name: String, 
    last: String, 
    email: String, 
    password: String
});

usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

usersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.local.password);
}




module.exports = mongoose.model('users',usersSchema);