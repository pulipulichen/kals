//最上層類別
function Grandfather() {
	this.birthday = {
		year: null,
		month: null,
		day: null
	};
	this.setBirthdayYear(1889);
}

//屬性
Grandfather.prototype.birthday = {
    year: null,
    month: null,
    day: null
};

Grandfather.prototype.set = function ()
{
	document.write('!!');
};

//方法
Grandfather.prototype.setBirthdayYear = function (year)
{
    this.birthday.year = year;
}; 

//上層類別
function Father() {
	Grandfather.call(this);
	this.setBirthdayYear(1915);	
}

//Father繼承Grandfather
Father.prototype = new Grandfather();	

//子類別之一
function Son() {
	Father.call(this);
	this.setBirthdayYear(1943);	
}

//Son繼承Father
Son.prototype = new Father();	

//子類別之二
function Daughter() {
	Father.call(this);
	this.setBirthdayYear(1945);	
}

//Daughter繼承Father
Daughter.prototype = new Father();
Daughter.prototype.setBirthdayYear = function(year) {
    
    //this.base = Father.prototype.setBirthdayYear;
    //this.base(year);
    Father.prototype.setBirthdayYear.call(this, year);
    
    this.birthday.year = this.birthday.year * 2; 
    
};

//輸出檢驗
var grandfather = new Grandfather();
var father = new Father();
var son = new Son();
var daughter = new Daughter();

document.write(grandfather.birthday.year);	//顯示1889
document.write(father.birthday.year);	//顯示1915
document.write(son.birthday.year);	//顯示1943
document.write('|' + daughter.birthday.year);	//顯示1945

daughter