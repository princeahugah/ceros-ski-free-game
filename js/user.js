class User {
    constructor(){
        this.subscribe('addUser', this.addUser);
    }

    addUser(name){
        let n = name.replace(/\b\w/g, l => l.toUpperCase());
        this.name = n;
        $('section#game-board .user span').html(n);
    }
}

export default User;