let groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

groceryList.shift();

groceryList.unshift('popcorn');
console.log(groceryList);

console.log(groceryList.slice(1, 4));
console.log(groceryList);


for(let i = 0;i<groceryList.length;i++){
  console.log(groceryList[i]);
}