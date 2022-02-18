class UserDto {
    constructor(user){
        this._id = user._id;
        this.email = user.email;
        this.password = user.password;
    }
}

module.exports = UserDto;