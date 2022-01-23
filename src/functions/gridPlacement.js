// returns a random number given a grid spot array length
function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

// returns target grid spot given an array of grid spots and an index
function getTargetGridSpot(gridSpots, index) {
  return gridSpots[index];
}

// checks to see if a grid spot is empty, returns true if empty/false if full
function isSpaceEmpty(gridSpot) {
  return gridSpot.classList.contains('full') ? false : true;
}

//places a single element into a spot in the grid
function placeElementIntoGridSpot(element, gridSpots) {
  console.log(gridSpots);

  // creates a child component
  const child = document.createElement('p');
  // inserts the element as inner text of the child component
  child.innerText = element;
  // gets a random number which is equal or less than the number of grid spots
  const randomNumber = getRandomNumber(gridSpots.length);
  // assigns a target grid spot using the grid spots array and the random number as the index
  const targetGridSpot = getTargetGridSpot(gridSpots, randomNumber);

  // checks to see if the target grid spot is empty
  if (isSpaceEmpty(targetGridSpot)) {
    // if it is empty, marks it as full and appends the child
    targetGridSpot.classList.remove('empty');
    targetGridSpot.classList.add('full');
    targetGridSpot.appendChild(child);
  } else {
    // if it is not empty, function calls itself and starts again
    placeElementIntoGridSpot();
  }
}

// places all elements into grid spots
export function placeElementsIntoGridSpots() {
  const testArray = ['🐖', '🐄', '🐕', '🐈', '🐎'];
  // gets all grid spots that are empty
  const gridSpots = document.getElementsByClassName('empty');

  // calls placeElementIntoGridSpot into each array
  // TODO figure out how to remove grid spot from the array so that you don't have to iterate through an array that fills with full places
  testArray.forEach((element) => {
    placeElementIntoGridSpot(element, gridSpots);
  });
}
