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

const MinesweeperApp = () => {
    const [game, setGame] = useState(null);
    const [board, setBoard] = useState([]);
    const [gameState, setGameState] = useState("playing");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newGame = new Minesweeper();
        newGame.initialize({x: 10, y: 10}, 10);
        setGame(newGame);
        setBoard(newGame.matrix);
        setGameState("playing");
        setModalOpen(false);
        setModalMessage("");
    };

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