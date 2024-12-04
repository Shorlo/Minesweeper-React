// src/Minesweeper/logic/Minesweeper.js

class Minesweeper{
    constructor(){
        this.size = {x: 0, y: 0};
        this.mineCount = 0;
        this.remainingCount = 0;
        this.flagCount = 0;
        this.state = "initialized";
        this.matrix = [];
    }

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

    getCell(x, y) {
        if (x < 0 || y < 0 || x >= this.size.x || y >= this.size.y) return null;
        
        return this.matrix[y * this.size.x + x];
    }

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
    
}