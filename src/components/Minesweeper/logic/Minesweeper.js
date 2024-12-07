// src/Minesweeper/logic/Minesweeper.js

/**
 * Represents the Minesweeper game logic.
 */
class Minesweeper{
    /**
     * Creates an instance of Minesweeper.
     */
    constructor(){
        /**
         * The size of the board (width and height).
         * @type {{x: number, y: number}}
         */
        this.size = {x: 0, y: 0};
        /**
         * The total number of mines on the board.
         * @type {number}
         */
        this.mineCount = 0;
        /**
         * The number of cells remaining to be disclosed to solve the board.
         * @type {number}
         */
        this.remainingCount = 0;
        /**
         * The number of cells flagged by the player.
         * @type {number}
         */
        this.flagCount = 0;
        /**
         * The current state of the game.
         * @type {string}
         */
        this.state = "initialized";
        /**
         * The matrix representing the board.
         * @type {Array<Object>}
         */
        this.matrix = [];
    }

    /**
     * Initializes the Minesweeper board.
     * @param {{x: number, y: number}} size - The size of the board.
     * @param {number} mineCount - The total number of mines.
     * @throws Will throw an error if the board size is too small or the mine count is invalid.
     */
    initialize(size, mineCount){
        if (size.x < 4 || size.y < 4) throw new Error("Board sieze too small.");
        if (mineCount < 2 || mineCount > size.x * size.y - 9) throw new Error("Invalid number of mines");

        this.size = size;
        this.mineCount = mineCount;
        this.remainingCount = size.x * size.y - mineCount;
        this.flagCount = 0;
        this.state = "pristine";
        this.matrix = Array.from({ length: size.x * size.y }, () => ({
            isMine: false,
            isDisclosed: false,
            isFlagged: false,
            isExploded: false,
            warning: 0
        }));
    }

    /**
     * Retrieves a cell from the board by its coordinates.
     * @param {number} x - The x-coordinate of the cell.
     * @param {number} y - The y-coordinate of the cell.
     * @returns {Object|null} The cell object or null if the coordinates are out of bounds.
     */
    getCell(x, y) {
        if (x < 0 || y < 0 || x >= this.size.x || y >= this.size.y) return null;
        
        return this.matrix[y * this.size.x + x];
    }

    /**
     * Places mines on the board while avoiding the initial clicked cell and its neighbors.
     * @param {number} startX - The x-coordinate of the initial click.
     * @param {number} startY - The y-coordinate of the initial click.
     */
    placeMines(startX, startY) {

        const forbiddenCells = new Set();
        const offsets = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [0, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1]
        ];

        offsets.forEach(([dx, dy]) => {
            const nx = startX + dx;
            const ny = startY + dy;
            if (nx >= 0 && ny >= 0 && nx < this.size.x && ny < this.size.y) {
                forbiddenCells.add(ny * this.size.x + nx);
            }
        });

        let remainingMines = this.mineCount; //

        while ( remainingMines > 0) {
            const index = Math.floor(Math.random() * this.matrix.length);
            
            if (!forbiddenCells.has(index) && !this.matrix[index].isMine) {
                this.matrix[index].isMine = true;
                this.updateWarnings(index);
                remainingMines--;
            }
        }

        this.state = "playing";
    }

    /**
     * Updates the warning numbers around a specific mine.
     * @param {number} index - The index of the cell containing the mine.
     */
    updateWarnings(index) {
        const x = index % this.size.x;
        const y = Math.floor(index / this.size.x);
        const offsets = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
        ];

        offsets.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            const cell = this.getCell(nx, ny);
            if (cell && !cell.isMine) {
                cell.warning++;
            }
        });
    }

    /**
     * Discloses a cell and triggers further disclosure if the cell has no adjacent mines.
     * @param {number} x - The x-coordinate of the cell.
     * @param {number} y - The y-coordinate of the cell.
     * @returns {string} The result of the disclosure.
     */
    disclose(x, y) {
        const cell = this.getCell(x, y);
        if (!cell || cell.isDisclosed || cell.isFlagged) return;

        if (this.state === "pristine") this.placeMines(x, y);

        if (cell.isMine) {
            cell.isExploded = true;
            this.state = "exploded";
            return "Mine hit!";
        }

        this.discloseRecursive(x, y);

        if (this.remainingCount === 0) {
            this.state = "solved";
            return "You solved it!";
        }
        
        return "Disclosed!";
    }

    /**
     * Recursively discloses adjacent cells with no adjacent mines.
     * @param {number} x - The x-coordinate of the cell.
     * @param {number} y - The y-coordinate of the cell.
     */
    discloseRecursive(x, y) {
        const cell = this.getCell(x, y);
        if (!cell || cell.isDisclosed || cell.isFlagged) return;

        cell.isDisclosed = true;
        this.remainingCount--;

        if (cell.warning === 0) {
            const offsets = [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
                [1, 1],
            ];

            offsets.forEach(([dx, dy]) => {
                this.discloseRecursive(x + dx, y + dy);
            });
        }
    }

    /**
     * Toggles a flag on a cell.
     * @param {number} x - The x-coordinate of the cell.
     * @param {number} y - The y-coordinate of the cell.
     */
    toggleFlag(x, y) {
        const cell = this.getCell(x, y);
        if (!cell || cell.isDisclosed) return;

        cell.isFlagged = !cell.isFlagged;
        this.flagCount += cell.isFlagged ? 1 : -1;
    }

    /**
     * Reveals all mines on the board.
     */
    revealAllMines() {
        this.matrix.forEach((cell) => {
            if (cell.isMine) {
                cell.isDisclosed = true;
            }
        });
    }

    /**
     * Prints the current state of the board to the console.
     */
    printBoard() {
        for (let y = 0; y < this.size.y; y++) {
            let row = "";
            for (let x = 0; x < this.size.x; x++) {
                const cell = this.getCell(x, y);
                if (cell.isDisclosed) {
                    row += cell.isMine ? "💣" : cell.warning || " ";
                } else {
                    row += cell.isFlagged ? "🚩" : "■";
                }
            }
            console.log(row);
        }
    }
}

export default Minesweeper;