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

    
}