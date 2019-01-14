import config from './config';
export default (function($){
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
    return User;
})(config.jQuery);