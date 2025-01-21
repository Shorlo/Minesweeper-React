// src/Minesweeper/MinesweeperApp.jsx

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import GameBoard from "./GameBoard.jsx";
import Minesweeper from "./logic/Minesweeper.js";
import "./styles/MinesweeperApp.css";

/**
 * MinesweeperApp component
 * 
 * This component represents the main Minesweeper game application.
 * It initializes the game, manages the game state, and handles the modal dialogs.
 * 
 * @component
 */
const MinesweeperApp = () => {
    const [game, setGame] = useState(null);
    const [board, setBoard] = useState([]);
    const [gameState, setGameState] = useState("playing");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        initializeGame();
    }, []);

    /**
     * Initializes a new Minesweeper game.
     * 
     * This function creates a new Minesweeper game instance, sets up the game board,
     * and resets the game state and modal dialogs.
     */
    const initializeGame = () => {
        const newGame = new Minesweeper();
        newGame.initialize({x: 20, y: 20}, 15);
        setGame(newGame);
        setBoard(newGame.matrix);
        setGameState("playing");
        setModalOpen(false);
        setModalMessage("");
    };

    /**
     * Handles the click event on a cell.
     * 
     * This function processes the cell click, updates the game state,
     * and handles the game over or win conditions.
     * 
     * @param {number} x - The x-coordinate of the clicked cell.
     * @param {number} y - The y-coordinate of the clicked cell.
     */
    const handleCellClick = (x, y) => {
        if (!game || gameState !== "playing") return;

        const result = game.disclose(x, y);
        if (result === "Mine hit!") {
            game.revealAllMines();
            setGameState("lost");
            setModalMessage("¡Game Over! Has pisado una mina.");
            setModalOpen(true);
        } else if (result === "You solved it!") {
            setGameState("won");
            setModalMessage("¡Felicidades! Has ganado.");
            setModalOpen(true);
        } 
        setBoard([...game.matrix]);
    };

    /**
     * Handles the right-click event on a cell.
     * 
     * This function processes the cell right-click, toggles the flag state of the cell,
     * and updates the game board accordingly.
     * 
     * @param {number} x - The x-coordinate of the right-clicked cell.
     * @param {number} y - The y-coordinate of the right-clicked cell.
     * @param {Event} event - The right-click event.
     */
    const handleCellRightClick = (e, x, y) => {
        e.preventDefault();
        if (!game || gameState !== "playing") return;

        game.toggleFlag(x, y);
        setBoard([...game.matrix]);
    };

    return (
        <div className="minesweeper-app">
            <Typography variant="h4" gutterBottom>Buscaminas</Typography>
            <Button variant="contained" color="primary" onClick={initializeGame}>Reiniciar</Button>
            <GameBoard 
                board={board}
                size={game ? game.size : {x: 0, y: 0}}
                onCellClick={handleCellClick}
                onCellRightClick={handleCellRightClick}
            />

            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>{modalMessage}</DialogTitle>
                <DialogContent>
                    <Typography>
                        {gameState === "lost"
                            ? "¡Inténtalo de nuevo! ¿Quieres volver a jugar?"
                            : "¡Buen trabajo! ¿Quieres jugar otra partida?"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={initializeGame}>Reiniciar</Button>
                    <Button variant="outlined" onClick={() => setModalOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MinesweeperApp;