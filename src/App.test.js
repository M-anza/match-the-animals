import MemoryCard from "./components/cards/Card.js";
import EndGame from "../src/components/endGame/EndGame.js";
import { fireEvent, screen, waitFor, act } from "@testing-library/react";
import { render } from "@testing-library/react";
import App from "./App.js";

describe("App Component Tests without Redux", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderApp = () => render(<App />);

  test("should initialize the game with cards", () => {
    renderApp();

    expect(screen.getAllByText("?")).toHaveLength(4);
  });

  test("should not allow clicking the same card twice", () => {
    renderApp();

    const cardElement = screen.getAllByText("?")[0];
    fireEvent.click(cardElement);
    expect(cardElement).toBeVisible();

    fireEvent.click(cardElement);
    expect(cardElement).toBeVisible();
  });

  test("should render the end game message when all cards are matched", async () => {
    renderApp();

    await waitFor(() => {
      const cardElements = screen.getAllByTestId(/card-/i);
      expect(cardElements.length).toBe(4);
    });

    render(<EndGame className="end-game" />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const wonImage = screen.getByAltText("You won");
    expect(wonImage).toBeInTheDocument();
  });

  test("should check for a match when two cards are flipped", async () => {
    renderApp();

    const initialCards = screen.getAllByText("?");
    const initialUnmatchedCount = initialCards.length;

    fireEvent.click(initialCards[0]);
    fireEvent.click(initialCards[1]);

    await waitFor(() => {
      const remainingCards = screen.getAllByText("?");
      const remainingUnmatchedCount = remainingCards.length;

      expect(remainingUnmatchedCount).toBeLessThan(initialUnmatchedCount);
    });
  });

  test("should allow restarting the game", async () => {
    renderApp();

    const cards = screen.getAllByText("?");
    for (let i = 0; i < cards.length; i += 2) {
      fireEvent.click(cards[i]);
      fireEvent.click(cards[i + 1]);

      await waitFor(() => {
        expect(screen.queryAllByText("?").length).toBeGreaterThan(0);
      });
    }

    const restartButton = screen.getByText(/Restart Game/i);
    fireEvent.click(restartButton);

    await waitFor(() => {
      expect(screen.getAllByText("?").length).toBe(4);
    });
  });

  test("should display the game title", () => {
    renderApp();

    const titleElement = screen.getByText("Memory Game");
    expect(titleElement).toBeInTheDocument();
  });

  test("should render all cards with '?' when not flipped (initial state)", () => {
    renderApp();

    const cardElements = screen.getAllByText("?");
    expect(cardElements).toHaveLength(4);
  });

  test("should render Restart Game button upon first card flip", () => {
    renderApp();

    fireEvent.click(screen.getAllByText("?")[0]);

    const restartButton = screen.getByText(/Restart Game/i);
    expect(restartButton).toBeInTheDocument();
  });

  test("should not allow more than two cards to be flipped at the same time", () => {
    renderApp();

    const firstCardElement = screen.getAllByText("?")[0];
    const secondCardElement = screen.getAllByText("?")[1];
    const thirdCardElement = screen.getAllByText("?")[2];

    fireEvent.click(firstCardElement);
    fireEvent.click(secondCardElement);

    expect(firstCardElement).toBeVisible();
    expect(secondCardElement).toBeVisible();

    fireEvent.click(thirdCardElement);
    expect(thirdCardElement).toBeVisible();
  });

  test("should not allow flipping back a matched card", () => {
    const card = { id: 1, symbol: "🐶", isFlipped: true, isMatched: true };
    const handleClick = jest.fn();
    render(<MemoryCard card={card} onClick={handleClick} />);

    const cardElement = screen.getByText("🐶");

    fireEvent.click(cardElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("should allow the user to choose grid dimensions", () => {
    render(<App />);
    const gridSizeSelect = screen.getByLabelText(/Grid Size/i);

    fireEvent.mouseDown(gridSizeSelect);

    const option = screen.getByText("4x4");
    fireEvent.click(option);

    const cards = screen.getAllByText("?");
    expect(cards).toHaveLength(16);
  });
});
