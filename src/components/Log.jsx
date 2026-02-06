export default function Log({ turns }) {
  if (turns.length === 0) {
    return <p id="log">No moves yet. Be the first!</p>;
  }

  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li
          key={`${turn.square.row}-${turn.square.col}-${index}`}
          className={index === 0 ? "highlighted" : ""}
        >
          <span className="log-entry">
            <strong>{turn.player}</strong> → Row {turn.square.row + 1}, Col{" "}
            {turn.square.col + 1}
          </span>
        </li>
      ))}
    </ol>
  );
}
