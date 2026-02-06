import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    if (isEditing) {
      onChangeName(symbol, editedName.trim() || name);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (event) => {
    setEditedName(event.target.value);
  };

  return (
    <li className={`player ${isActive ? "active" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleChange}
          className="player-name-input"
          aria-label={`Edit name for ${symbol}`}
          autoFocus
        />
      ) : (
        <span className="player-name">{editedName}</span>
      )}
      <span className="player-symbol">{symbol}</span>
      <button className="edit-btn" onClick={handleToggleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
