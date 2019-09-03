const obj ={id:1, name:"fredric"};
console.log(obj);

const copy = {... obj}
copy.name = "Lennart";
console.log("The Copy: ", copy);

console.log(obj);