// src/Minesweeper/GameContainer.jsx

import React from "react";
import MinesweeperApp from "./MinesweeperApp";
import "./styles/GameContainer.css"

/**
 * GameContainer component
 * 
 * This component serves as a container for the MinesweeperApp component.
 * It provides a styled wrapper around the main game application.
 * 
 * @component
 */
const GameContainer = () => {
    return (
        <div className="game-container">
            <MinesweeperApp />
        </div>
    );
};

export default GameContainer;