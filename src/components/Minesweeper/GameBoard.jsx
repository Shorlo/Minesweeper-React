// src/Minesweeper/GameBoard.jsx

import React from "react";
import Cell from "./Cell";
import "./styles/GameBoard.css";

/**
 * GameBoard component
 * 
 * This component renders the Minesweeper game board.
 * It displays the grid of cells and handles the click events on each cell.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Array} props.board - The game board matrix.
 * @param {Object} props.size - The size of the game board.
 * @param {number} props.size.x - The number of columns in the game board.
 * @param {number} props.size.y - The number of rows in the game board.
 * @param {Function} props.onCellClick - The function to handle cell click events.
 * @param {Function} props.onCellRightClick - The function to handle cell right-click events.
 */
const GameBoard = ({ board, size, onCellClick, onCellRightClick }) => {
    return (
        <div className="game-board"
            style={{
                gridTemplateColumns: `repeat(${size.x}, 30px)`,
                gridTemplateRows: `repeat(${size.y}, 30px)`,
            }}
        >
            {board.map((cell, index) => {
                const x = index % size.x;
                const y = Math.floor(index / size.x);
                return (
                    <Cell
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        cell={cell}
                        onClick={() => onCellClick(x, y)}
                        onRightClick={(e) => onCellRightClick(e, x, y)}
                    />
                );
            })}
        </div>
    );
};

export default GameBoard;