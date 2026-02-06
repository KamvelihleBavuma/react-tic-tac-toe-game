import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WIN_COMBINATIONS } from "./win-combinations.js";

const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

function deriveActivePlayer(gameTurns) {
  if (gameTurns.length === 0) return "X";
  return gameTurns[0].player === "X" ? "O" : "X";
}

function deriveWinner(gameBoard, players) {
  for (const comb of WIN_COMBINATIONS) {
    const [a, b, c] = comb;
    const first = gameBoard[a.row][a.col];
    const second = gameBoard[b.row][b.col];
    const third = gameBoard[c.row][c.col];

    if (first && first === second && first === third) {
      return players[first];
    }
  }
  return null;
}

function deriveGameBoard(gameTurns) {
  const board = INITIAL_GAME_BOARD.map((row) => [...row]);
  for (const { square, player } of gameTurns) {
    board[square.row][square.col] = player;
  }
  return board;
}

export default function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => [
      {
        square: { row: rowIndex, col: colIndex },
        player: deriveActivePlayer(prevTurns),
      },
      ...prevTurns,
    ]);
  };

  const handleRestart = () => setGameTurns([]);

  const handleNameChange = (symbol, newName) => {
    setPlayers((prev) => ({ ...prev, [symbol]: newName }));
  };

  return (
    <>
      <header className="app-header">
        <img src="game-logo.png" alt="Tic Tac Toe Logo" />
        <h1>Tic-Tac-Toe</h1>
      </header>

      <main id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            name={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </main>

      <Log turns={gameTurns} />
    </>
  );
}
