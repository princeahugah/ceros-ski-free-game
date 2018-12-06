const lipstick = function(target){
    target.lips = 'red lips';
    console.log(target);
};

@lipstick
class Girl {
	constructor(attr){
     this.instanceField = attr;
  }
}

Girl.mystatic = 1234;
console.log(`the girl has ${Girl.lips}`);

const a = new Girl('a');
const b = new Girl('b');

Girl.newstatic = 'i see';
console.log(a);
console.log(b);


const readonly = function (target, key, descriptor){
    descriptor.writable = false;
    return descriptor;
}

class Car {
		constructor(type){
    	this.type = type;
    }
    
    @readonly
    getcolor(){
        return this.type;
    }
}

let car = new Car('red');
car.getcolor = function(){
	return 'blue';
}
console.log(car.getcolor());