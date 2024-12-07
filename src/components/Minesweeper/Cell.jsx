// src/Minesweeper/Cell.jsx

import React from "react";
import "./styles/Cell.css";

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