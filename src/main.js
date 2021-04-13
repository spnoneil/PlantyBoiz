import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import powerPlant from './powerplant.js';

// const powerPlant = require('./powerplant.js');


// $(document).ready(function() {

//   // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

//   $('#feed').click(function() {
//     const newState = stateControl(blueFood);
//     $('#soil-value').text(`Soil: ${newState.soil}`);
//   });

//   // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

//   $('#show-state').click(function() {
//     // We just need to call stateControl() without arguments to see our current state.
//     const currentState = stateControl();
//     $('#soil-value').text(`Soil: ${currentState.soil}`);
//   });
// });