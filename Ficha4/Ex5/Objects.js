let person = {
  _name: 'Lu Xun',
  _age: 137,
  
  set age(ageIn) {
    if (typeof ageIn === 'number') {
      this._age = ageIn;
    }
    else {
      console.log('Invalid input');
      return 'Invalid input';
    }
  },
  
  get age() {
    console.log(`${this._name} is ${this._age} years old.`);
    return this._age;
  }

};


person.age = 'Thirty-nine';
person.age = 39;

console.log(person.age);