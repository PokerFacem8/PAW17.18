//Block Scope 3
const starCount = () => {
  let i = 5;
  console.log(i);
  for (let i = 0; i < 12; i++) {
    console.log(i);  
  }
};

starCount();

//Block Scope 2

const visibleLightWaves = () => {
  let lightWaves = 'Moonlight';
  let region = 'The Arctic';
    if (region === 'The Arctic') {
      let lightWaves = 'Northern Lights';
      console.log(lightWaves);  
    }
  console.log(lightWaves);
};

visibleLightWaves();

//Global Scope 2

const satellite = 'The Moon';
const galaxy = 'The Milky Way';

let stars = 'North Star';

const myNightSky = () => {
  stars = 'Sirius';
  return 'Night Sky: ' + satellite + ', ' + stars + ', ' + galaxy;
};

console.log(myNightSky());


