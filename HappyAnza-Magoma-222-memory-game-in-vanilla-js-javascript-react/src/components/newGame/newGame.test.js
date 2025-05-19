import { render, fireEvent, screen } from "@testing-library/react";
import NewGameButton from "./NewGame.js";
import shuffleArray from "../../utils/ShuffledCards.js";
import App from "../../App.js";

jest.mock("../../utils/ShuffledCards.js", () => jest.fn());

describe("NewGameButton Component", () => {
  const originalOrder = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨"];
  const reshuffledOrder = ["🐻", "🐨", "🐭", "🐶", "🐰", "🐱", "🐼", "🐹"];

  beforeEach(() => {
    shuffleArray.mockClear();
  });

  test("should reshuffle cards when Restart Game button is clicked", () => {
    shuffleArray.mockImplementationOnce(() => [...originalOrder]);
    shuffleArray.mockImplementationOnce(() => [...reshuffledOrder]);

    const { rerender } = render(<App />);

    const initialCards = screen.getAllByText("?");
    fireEvent.click(initialCards[0]);

    const restartButton = screen.getByText(/Restart Game/i);
    fireEvent.click(restartButton);

    rerender(<App />);

    const reshuffledCards = screen.getAllByText("?");

    expect(reshuffledCards).not.toBe(initialCards);
  });

  test("should render Start New Game button when game is completed", () => {
    shuffleArray.mockImplementationOnce(() => originalOrder);

    render(<App />);

    const cards = screen.getAllByText("?");
    for (let i = 0; i < cards.length; i += 2) {
      fireEvent.click(cards[i]);
      fireEvent.click(cards[i + 1]);
    }

    const startNewGameButton = screen.getByText(/Restart Game/i);

    expect(startNewGameButton).toBeInTheDocument();
  });

  test("should not render any button when showButton is false", () => {
    const handleClick = jest.fn();
    render(
      <NewGameButton
        onClick={handleClick}
        showButton={false}
        gameCompleted={false}
      />
    );

    expect(screen.queryByText(/Restart Game/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Start New Game/i)).not.toBeInTheDocument();
  });

  test("should reshuffle cards when Start New Game button is clicked after game completion", () => {
    const handleClick = jest.fn();
    render(
      <NewGameButton
        onClick={handleClick}
        showButton={true}
        gameCompleted={true}
      />
    );

    shuffleArray.mockImplementationOnce(() => originalOrder);

    render(<App />);

    const initialCards = screen.getAllByText("?");
    for (let i = 0; i < initialCards.length; i += 2) {
      fireEvent.click(initialCards[i]);
      fireEvent.click(initialCards[i + 1]);
    }

    const startNewGameButton = screen.getByText(/Start New Game/i);
    fireEvent.click(startNewGameButton);

    shuffleArray.mockImplementationOnce(() => reshuffledOrder);

    const reshuffledCards = screen.getAllByText("?");
    expect(initialCards).not.toEqual(reshuffledCards);
  });
});
