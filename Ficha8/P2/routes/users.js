const bcrypt = require('bcrypt');


class User {
    constructor(name, last, email, password) {
        this.name = name;
        this.last = last;
        this.email = email;
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    }

    validPassword(password, localpassword) {
        return bcrypt.compareSync(password, localpassword);
    }
};

module.exports = User;



