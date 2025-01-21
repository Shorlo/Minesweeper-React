// src/Minesweeper/Cell.jsx

import React from "react";
import "./styles/Cell.css";

/**
 * Cell component
 * 
 * This component represents a single cell in the Minesweeper game board.
 * It handles the display of the cell's state and manages click events.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.cell - The cell object containing its state.
 * @param {Function} props.onClick - The function to handle cell click events.
 * @param {Function} props.onRightClick - The function to handle cell right-click events.
 */
const Cell = ({cell, onClick, onRightClick}) => {
    const getClassNames = () => {
        let classes = "cell";
        if (cell.isDisclosed) classes += " disclosed";
        if (cell.isMine && cell.isDisclosed) classes += " mine";
        if (cell.isFlagged) classes += " flag";
        return classes;
    }

    return (
        <div 
            className={getClassNames()}
            onClick={onClick}
            onContextMenu={onRightClick}
        >
            {cell.isDisclosed
                ? cell.isMine
                    ? "💣"
                    : cell.warning || ""
                : cell.isFlagged
                ? "🚩"
                : ""}
        </div>
    );
};

export default Cell;