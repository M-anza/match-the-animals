import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MemoryCard from "./components/cards/Card.js";
import EndGame from "./components/endGame/EndGame.js";
import NewGameButton from "./components/newGame/NewGame.js";
import Timer from "./components/timer/Timer.js";
import "./App.css";
import symbols from "./utils/Symbols.json";
import shuffleArray from "./utils/ShuffledCards.js";

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: 2, cols: 2 });
  const [totalCards, setTotalCards] = useState(4);
  const [flips, setFlips] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const initializeGame = useCallback(() => {
    setTimeTaken(0);
    setFlips(0);
    setGameCompleted(false);
    setShowButton(false);

    const requiredSymbols = symbols.slice(0, totalCards / 2);
    const shuffledSymbols = [...requiredSymbols, ...requiredSymbols];
    shuffleArray(shuffledSymbols);

    const initialCards = shuffledSymbols.map((symbolObj, index) => ({
      id: index,
      name: symbolObj.name,
      symbol: symbolObj.symbol,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(initialCards);
    setFlippedCards([]);
    setMatchedCards([]);
  }, [totalCards]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleGridSizeChange = (event) => {
    const [rows, cols] = event.target.value.split("x").map(Number);
    setGridSize({ rows, cols });
    setTotalCards(rows * cols);
  };

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || flippedCards.length === 2)
      return;

    setFlips((prevFlips) => prevFlips + 1);

    const newFlippedCards = [...flippedCards, clickedCard];
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards(newFlippedCards);
    setShowButton(true);

    if (newFlippedCards.length === 2) {
      setTimeout(() => checkForMatch(newFlippedCards), 1000);
    }
  };

  const checkForMatch = (flippedCards) => {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.name === secondCard.name) {
      const newCards = cards.map((card) =>
        card.name === firstCard.name ? { ...card, isMatched: true } : card
      );
      setCards(newCards);
      setMatchedCards([...matchedCards, firstCard.name]);

      if (matchedCards.length + 1 === totalCards / 2) {
        setGameCompleted(true);
      }
    } else {
      const newCards = cards.map((card) =>
        card.id === firstCard.id || card.id === secondCard.id
          ? { ...card, isFlipped: false }
          : card
      );
      setCards(newCards);
    }
    setFlippedCards([]);
  };

  return (
    <Container className="game-container">
      <Typography
        variant="h3"
        component="h1"
        className="memory-game-title"
        gutterBottom
      >
        Memory Game
      </Typography>

      {!gameCompleted && (
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="grid-size-label">Grid Size</InputLabel>
          <Select
            labelId="grid-size-label"
            value={`${gridSize.rows}x${gridSize.cols}`}
            onChange={handleGridSizeChange}
            label="Grid Size"
          >
            <MenuItem value="2x2">2x2</MenuItem>
            <MenuItem value="3x2">3x2</MenuItem>
            <MenuItem value="4x3">4x3</MenuItem>
            <MenuItem value="4x4">4x4</MenuItem>
          </Select>
        </FormControl>
      )}

      {gameCompleted ? (
        <EndGame className="end-game" timeTaken={timeTaken} flips={flips} />
      ) : (
        <>
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item xs={12 / gridSize.cols} key={card.id}>
                <MemoryCard
                  card={card}
                  onClick={() => handleCardClick(card.id)}
                />
              </Grid>
            ))}
          </Grid>
          <Timer isActive={!gameCompleted} onTimeUpdate={setTimeTaken} />
        </>
      )}

      <div className="button-container">
        <NewGameButton
          onClick={initializeGame}
          showButton={showButton}
          gameCompleted={gameCompleted}
        />
      </div>
    </Container>
  );
};

export default App;
