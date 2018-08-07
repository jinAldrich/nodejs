var learn = function (something) {
	console.log(something);
}

var we = function (callback, something) {
	something += ' is cool';
	callback(something);
}

// we(learn, "Nodejs");

we((something)=>{
	console.log("000000");
	console.log(something);
}, 'Nodejs');

