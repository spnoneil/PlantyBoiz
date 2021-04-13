import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// const hydrate = (plant) => {
//   return {
//     ...plant,
//     water: (plant.water || 0) + 1
//   }
// };

// const feed = (plant) => {
//   return {
//     ...plant,
//     soil: (plant.soil || 0) + 1
//   }
// };

//REFACTOR ABOVE:
// const changePlantState = (plant, property) => {
//   return {
//     ...plant,
//     [property]: (plant[property] || 0) + 1
//   }
// }
//TO CALL changePlantState:
// > let plant = { soil: 0, light: 0, water: 0 }
// > changePlantState(plant, "soil")
// {soil: 1, light: 0, water: 0}

//REFACTOR TO ADD VALUE
// const changeState = (state, prop, value) => ({
//   ...state,
//   [prop] :  (state[prop] || 0) + value
// })

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
//CURRY THAT BAD BOY:

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    })
  }
}


//EXAMPLE SMALLER FUNCTIONS:
// We create functions using our function factory. We could easily create many more.
// const giveLight = changeState("light");

// const feed = changeState("soil"); // -> feed(5)(plant)
const blueFood = changeState("soil")(5); // -> blueFood(plant)
const greenFood = changeState("soil")(10);
const yuckyFood = changeState("soil")(-5);

const hydrate = changeState("water")(1); // -> hydrate(10)(plant)
const superWater = changeState("water")(5);


//MAGIC STATE FUNCTION THAT HURTS MY BRAIN:
// This function stores our state.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState };
    return newState;
  }
}

const stateControl = storeState();
const stateControl2 = storeState();

const cast = (state) => ({
  castFireball: (target) => {
    $('#action-text').text(`${state.name} casts fireball!!!!`)
    target.soil += -5;
    target.water += -5;
  },
  castHeal: (target) => {
    $('#action-text').text(`${state.name} casts heal.`)
    target.soil += 10;
    target.water += 10;
  }
})

const plant = (name) => {
  let state = {
    name,
    soil: 15,
    water: 15,
  }

  return Object.assign(state, cast(state), storeState())
}


const plantyBoi = plant('James');
const enemyBoi = plant('Derek');
// plantyBoi.castFireball(enemyBoi);
// plantyBoi.castHeal(plantyBoi);
console.log(plantyBoi);



$('#heal').click(function() {
  plantyBoi.castHeal(plantyBoi);
});
$('#fireball').click(function() {
  plantyBoi.castFireball(enemyBoi);
});




// const fedPlant = stateControl(blueFood);


$(document).ready(function() {

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  $('#bluefood').click(function() {
    const newState = stateControl(blueFood);
    console.log(newState);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });
  $('#greenfood').click(function() {
    const newState = stateControl(greenFood);
    console.log(newState);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });
  $('#yuckyfood').click(function() {
    const newState = stateControl(yuckyFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });



  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-soil-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
  });



  $('#water').click(function() {
    const newState = stateControl(hydrate);
    console.log(newState);
    $('#water-value').text(`Water: ${newState.water}`);
  });
  $('#superwater').click(function() {
    const newState = stateControl(superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  });
  $('#heal').click(function() {
    const newPlant = stateControl();
    newPlant.castHeal(newPlant);
    $('#soil-value').text(`Soil: ${newPlant.soil}`);
    $('#water-value').text(`Water: ${newPlant.water}`)
  });

  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-water-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#water-value').text(`Water: ${currentState.water}`);
  });


  $('#bluefood2').click(function() {
    const newState = stateControl2(blueFood);
    $('#soil-value2').text(`Soil: ${newState.soil}`);
  });
  $('#greenfood2').click(function() {
    const newState = stateControl2(greenFood);
    $('#soil-value2').text(`Soil: ${newState.soil}`);
  });
  $('#yuckyfood2').click(function() {
    const newState = stateControl2(yuckyFood);
    $('#soil-value2').text(`Soil: ${newState.soil}`);
  });



  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-soil-state2').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl2();
    $('#soil-value2').text(`Soil: ${currentState.soil}`);
  });



  $('#water2').click(function() {
    const newState = stateControl2(hydrate);
    $('#water-value2').text(`Water: ${newState.water}`);
  });
  $('#superwater2').click(function() {
    const newState = stateControl2(superWater);
    $('#water-value2').text(`Water: ${newState.water}`);
  });

  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-water-state2').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl2();
    $('#water-value2').text(`Water: ${currentState.water}`);
  });
});