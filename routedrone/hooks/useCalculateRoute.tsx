import { useState, useEffect } from 'react';

const useCalculateRoute = (origin, collection, destination, movementTimes) => {
    //Store path and totalTime
    const [route, setRoute] = useState({ path: [], totalTime: 0 });

    useEffect(() => {
        //This function find path and total time to start and end position
        const findPathAndTime = (start, end) => {
            let path = [start];
            let totalTime = 0;
            let current = start; //Define the actual pos as start current point

            //Looping while the current pos is diff from end destination
            while (current !== end) {
                //If there's a direct way to the destination
                if (movementTimes[current] && movementTimes[current][end]) {
                    //Add time getting destination, update way and atual pos
                    totalTime += movementTimes[current][end];
                    path.push(end);
                    current = end;
                } else {
                    //if not, finding next setp
                    let nextStep = getNextStep(current, end, movementTimes);
                    if (!nextStep) {
                        break;
                    }
                    //Add time getting destination, update way and atual pos
                    totalTime += movementTimes[current][nextStep];
                    path.push(nextStep);
                    current = nextStep;
                }
            }

            return { path, totalTime };
        };

        const getNextStep = (current, end, movementTimes) => {
            //Convert chess coordinates to array indices
            const coordsToIndices = (coords) => {
                return [8 - parseInt(coords[1]), coords.charCodeAt(0) - 'A'.charCodeAt(0)];
            };

            // Converts array indices back to chess coordinates
            const indicesToCoords = (indices) => {
                return `${String.fromCharCode('A'.charCodeAt(0) + indices[1])}${8 - indices[0]}`;
            };

            //Get the array indices for the current home and destination
            const [currentRow, currentCol] = coordsToIndices(current);
            const [endRow, endCol] = coordsToIndices(end);

            //Decide if move horizontally or vertically to get closer to the destination
            let nextStep = null;
            if (currentCol !== endCol) {
                // @ts-ignore
                nextStep = indicesToCoords([currentRow, currentCol + Math.sign(endCol - currentCol)]);
            } else if (currentRow !== endRow) {
                // @ts-ignore
                nextStep = indicesToCoords([currentRow + Math.sign(endRow - currentRow), currentCol]);
            }

            // Checks if the next step is valid (exists in the movementTimes data)
            if (nextStep && movementTimes[current] && movementTimes[current][nextStep]) {
                return nextStep;
            } else {
                return null;
            }
        };

        // If all coordinates and movement times are defined
        if (origin && collection && destination && movementTimes) {
            // Calculates the path and time for pickup and destination
            const { path: pathToCollection, totalTime: timeToCollection } = findPathAndTime(origin, collection);
            const { path: pathToDestination, totalTime: timeToDestination } = findPathAndTime(collection, destination);

            // Update the route state by combining the paths and adding the times
            setRoute({
                path: [...pathToCollection, ...pathToDestination.slice(1)], // Avoid duplicating the collection house
                totalTime: timeToCollection + timeToDestination
            });
        }
    }, [origin, collection, destination, movementTimes]); // Dependencies

    return route;
};

export default useCalculateRoute;
