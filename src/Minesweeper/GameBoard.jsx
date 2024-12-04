// src/Minesweeper/GameBoard.jsx

import React from "react";
import { Grid } from "@mui/material/Grid2";
import Cell from "./Cell";
import "./styles/GameBoard.css";

const GameBoard = ({ board, size, onCellClick, onCellRightClick}) => {
    return (
        <Grid 
            container
            spacing={0}
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${size.x}, 30px)`,
                gridTemplateRows: `repeat(${size.y}, 30px)`,
                justifyContent: "center",
                margin: "20px auto",
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
        </Grid>
    );
};

export default GameBoard;