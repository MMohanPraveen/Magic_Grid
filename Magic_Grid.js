/**
 * Display the given magic grid in the console.
 * 
 * @param {Array<Array<number>>} grid - The magic grid to be displayed.
 */
function outputGrid(grid) {
    console.log("Magic Grid:");
    console.log("-------------");
    for (let i = 0; i < grid.length; i++) {
        let rowStr = "| ";
        for (let j = 0; j < grid[i].length; j++) {
            rowStr += grid[i][j] + " | ";
        }
        console.log(rowStr);
        if (i === grid.length - 1) {
            console.log("-------------");
        } else {
            console.log("----+----+---");
        }
    }
}

/**
 * Generate all permutations of a given string.
 * 
 * @param {string} s - The input string.
 * @returns {Array<string>} - An array containing all permutations of the input string.
 */
function stringPermutations(s) {
    if (s.length === 1) return [s];
    const permutations = [];
    for (let i = 0; i < s.length; i++) {
        const charsLeft = s.substring(0, i) + s.substring(i + 1);
        const innerPermutations = stringPermutations(charsLeft);
        for (let j = 0; j < innerPermutations.length; j++) {
            permutations.push(s[i] + innerPermutations[j]);
        }
    }
    return permutations;
}

/**
 * Check if the given grid is a magic square (i.e., the sums of the numbers in each row, 
 * each column, and both main diagonals are the same).
 * 
 * @param {Array<Array<number>>} grid - The grid to check.
 * @returns {boolean} - True if the grid is a magic square, otherwise False.
 */
function isMagic(grid) {
    const val = grid[0].reduce((a, b) => a + b);

    for (let row of grid) {
        if (row.reduce((a, b) => a + b) !== val) {
            return false;
        }
    }

    for (let i = 0; i < 3; i++) {
        let colSum = 0;
        for (let j = 0; j < 3; j++) {
            colSum += grid[j][i];
        }
        if (colSum !== val) {
            return false;
        }
    }

    if ((grid[0][0] + grid[1][1] + grid[2][2] !== val) || (grid[0][2] + grid[1][1] + grid[2][0] !== val)) {
        return false;
    }

    return true;
}

/**
 * Generates a random 3x3 magic grid.
 * 
 * @returns {Array<Array<number>>} - A 3x3 magic grid.
 */
function generateRandomGrid() {
    const permutations = stringPermutations("123456789");

    while (true) {
        const randomIndex = Math.floor(Math.random() * permutations.length);
        const randomPermutation = permutations[randomIndex];
        const grid = [];
        
        for (let i = 0; i < 3; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(parseInt(randomPermutation[i * 3 + j]));
            }
            grid.push(row);
        }

        if (isMagic(grid)) {
            return grid;
        }
    }
}

const grid = generateRandomGrid();
outputGrid(grid);
