const bcrypt = require('bcrypt');


class User {

    constructor(first,last,email,pass){
        this.first = first,
        this.last = last,
        this.email = email,
        this.pass = bcrypt.hashSync(pass, bcrypt.genSaltSync(9))
    };

    static validPassword(password,localpassword){
        return bcrypt.compareSync(password,localpassword);
    }
}


module.exports = User;



