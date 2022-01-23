// returns a random number given a grid spot array length
function getRandomNumber(length) {
  return Math.floor(Math.random() * length + 1);
}

//returns a grid coordinate
function placeElementIntoGridSpot(rows, columns, coordinatesArray) {
  // gets a random number for the row and column
  const randomRowNumber = getRandomNumber(rows);
  const randomColumnNumber = getRandomNumber(columns);
  // creates coordinate using the row and column
  const targetCoordinate = `R${randomRowNumber}C${randomColumnNumber}`;

  // checks to see if the coordinate is already in the array
  // no = returns the coordinate
  if (!coordinatesArray.includes(targetCoordinate)) {
    return targetCoordinate;
    // yes = tries again
  } else {
    return placeElementIntoGridSpot(rows, columns, coordinatesArray);
  }
}

// returns an array of grid coordinates equal in length to the number of iterations required
export function placeElementsIntoGridSpots(rows, columns, iterations = 5) {
  const coordinatesArray = [];

  for (let i = 0; i <= iterations; i++) {
    const coordinate = placeElementIntoGridSpot(
      rows,
      columns,
      coordinatesArray
    );

    coordinatesArray.push(coordinate);
  }

  return coordinatesArray;
}
