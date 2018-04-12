var Student = {
  name: 'Robot',
  height: 1.2,
};

var xiaoming = {
  name: '小明'
};

xiaoming.__proto__ = Student;

console.log(xiaoming)

function Person() {
  this.name = 'Robot';
  this.height = 1.2;
}

function Student1() {
  this.name = 'lisi';
}

// Student1.prototype = new Person();

var person = new Person();

var lisi = new Student1();

lisi.__proto__ = person

console.log(lisi);

function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}
