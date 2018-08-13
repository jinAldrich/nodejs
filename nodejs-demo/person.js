 class person {

	constructor() {
		console.log("constructor");
		this.name = "zhangsan";
	}

	getName() {
		console.log("getName:" + this.name);
	}
}

var p = new person();
p.getName();


function Dog(name) {
	this.name = name;

	// constructor() {
	// 	console.log("constructor...");
	// }
	// Function() {
	// 	console.log('Function...');
	// }
}

var dog = new Dog('wawa');