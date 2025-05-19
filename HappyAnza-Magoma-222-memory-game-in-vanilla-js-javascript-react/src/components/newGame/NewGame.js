import Button from "@mui/material/Button";
import "./NewGame.css";

export default function NewGameButton({ onClick, showButton, gameCompleted }) {
  if (!showButton) return null;

  return (
    <Button
      variant="text"
      onClick={onClick}
      className="new-game-button"
      data-testid="new-game-button"
    >
      {gameCompleted ? "Start New Game" : "Restart Game"}
    </Button>
  );
}
