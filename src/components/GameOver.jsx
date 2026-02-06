export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over" role="dialog" aria-labelledby="game-over-title">
      <h2 id="game-over-title">Game Over!</h2>
      {winner ? <p>{winner} won 🎉</p> : <p>It&apos;s a draw 🤝</p>}
      <button className="rematch-btn" onClick={onRestart}>
        Rematch
      </button>
    </div>
  );
}
