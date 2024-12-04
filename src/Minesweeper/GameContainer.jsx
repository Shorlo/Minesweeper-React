// src/Minesweeper/GameContainer.jsx

import React from "react";
import MinesweeperApp from "./MinesweeperApp";
import "./styles/GameContainer.css"

const GameContainer = () => {
    return (
        <div className="game-container">
            <MinesweeperApp />
        </div>
    );
};

export default GameContainer;