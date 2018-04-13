var Student = {
  name: 'Robot',
  height: 1.2,
};

var xiaoming = {
  name: '小明'
};

xiaoming.__proto__ = Student;

// console.log(xiaoming)

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

// console.log(lisi);

function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

function Student2(props) {
    this.name = props.name || 'Unnamed';
}

Student2.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props){
    Student2.call(this,props)
    this.grade = props.grade || 1;
}

PrimaryStudent.prototype.say = function(){
    alert(this.grade);
}

PrimaryStudent.prototype = Student2.prototype;

var ps = new PrimaryStudent({name:'lxq',grade:100});

// console.log(ps);

function Parent(){
    this.name='lxq';
}
Parent.prototype.sex='f';
function Child (age) {
  this.age = age;
}

// way 1
// Child.prototype=new Parent();
// var c=new Child(20);
// 能访问自身属性，父对象属性，父对象原型链上的属性
// console.log(c.age,c.name,c.sex);//20 "lxq" "f"
//console.log(c);

// way 2
// Child.prototype=Parent.prototype;
// var c=new Child(20);
// 父对象的属性不能访问到，因为直接原型链直接指向了父的prototype
// console.log(c.age,c.name,c.sex);//20 undefined "f"
// Child.prototype.value=1;
// 会污染父prototype，子原型链上增加属性会影响到父元素原型链
// console.log(Parent.prototype.value);//1

// way 3 空对象中转，打破子原型链对父元素原型链的印象
function F(){}
F.prototype=Parent.prototype;
Child.prototype=new F();
var c=new Child(20);
console.log(c.age,c.name,c.sex);//20 undefined "f"
Child.prototype.value=1;
console.log(Parent.prototype.value);//undefined
console.log(c);