import { Card, CardContent, Typography } from "@mui/material";
import "./Card.css";

const MemoryCard = ({ card, onClick }) => {
  const handleCardClick = () => {
    if (card.isFlipped || card.isMatched) return;
    onClick(card.id);
  };

  return (
    <Card
      className={`custom-card ${card.isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
      data-testid={`card-${card.id}`}
      data-id={card.id}
      data-name={card.name}
      data-symbol={card.symbol}
    >
      <CardContent className="card">
        <Typography variant="h5" component="div">
          {card.isFlipped || card.isMatched ? card.symbol : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;
