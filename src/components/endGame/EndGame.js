import React, { useState, useEffect } from "react";
import "./EndGame.css";

const EndGame = ({ className, timeTaken, flips }) => {
  const [showImage, setShowImage] = useState(false);
  const wonImage = require("./images/you_won_pic.webp");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowImage(true);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={className} data-testid="end-game">
      {showImage && (
        <>
          <img
            src={wonImage}
            alt="You won"
            className="youWonImage"
            data-testid="img"
          />

          <p>You completed the game in {timeTaken} seconds!</p>
          <p>You finished the game in {flips} flips!</p>
        </>
      )}
    </div>
  );
};

export default EndGame;
