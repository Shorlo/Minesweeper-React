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
}