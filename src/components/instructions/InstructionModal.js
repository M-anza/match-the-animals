import { useState } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import "./InstructionModal.css";

const instructions = [
  {
    title: "Game Instructions 🐾",
    content: `Welcome to Match the Animals!

Your goal is simple: click the cards and find matching animal pairs. Test your memory and have fun with these friendly creatures!`,
  },
 
  {
    title: "⚙️ Game Settings:",
    content: `- Change the game level to make the game easier or more challenging.
- Choose your preferred level before you begin or adjust it anytime to change difficulty.

Ready to play? Let the animal matching fun begin!
- Find matching pairs of the same animal.
- Keep clicking until you’ve matched all the animals!`,
  },
];

const InstructionModal = ({ open, onClose }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < instructions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="instruction-modal">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {instructions[step].title}
        </Typography>
        <Typography variant="body1" className="instruction-content">
          {instructions[step].content.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Skip Instructions
          </Button>
          <Button onClick={handleNext} variant="contained" color="primary">
            {step < instructions.length - 1 ? "Next" : "Start Game"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InstructionModal;
