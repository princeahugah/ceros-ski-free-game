const Mediator = (function(){
    
    const messages = {};

    class Mediator {
        static subscribe(msg, fn, context){
            if( !messages[msg] ){
                messages[msg] = [];
            }
            messages[msg].push({context: context || this, callback: fn});
        }

        static publish(msg){
            const args = Array.prototype.slice.call( arguments, 1 );
            if( !messages[msg] ){
                return false;
            }
            
            messages[msg].forEach(function(subscription){
                subscription.callback.apply(subscription.context, args);
            });
        }

        static installTo(obj){
            obj.subscribe = Mediator.subscribe;
            obj.publish = Mediator.publish;
        }

        static getMessages(){
            return messages;
        }

    }
    
    return Mediator;
})();

export default Mediator;