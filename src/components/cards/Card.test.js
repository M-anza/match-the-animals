import { render, fireEvent, screen } from "@testing-library/react";
import MemoryCard from "./Card.js";

describe("MemoryCard Component", () => {
  test("should render card symbol when flipped", () => {
    const card = { id: 1, symbol: "🐶", isFlipped: true, isMatched: false };
    const handleClick = jest.fn();
    render(<MemoryCard card={card} onClick={handleClick} />);
    expect(screen.getByText("🐶")).toBeInTheDocument();
  });

  test("should flip card when clicked", () => {
    const card = { id: 1, symbol: "🐶", isFlipped: false, isMatched: false };
    const handleClick = jest.fn();
    render(<MemoryCard card={card} onClick={handleClick} />);
    const cardElement = screen.getByText("?");
    fireEvent.click(cardElement);

    expect(handleClick).toHaveBeenCalledWith(card.id);
  });

  test("should render matched card correctly", () => {
    const card = { id: 1, symbol: "🐶", isFlipped: true, isMatched: true };
    const handleClick = jest.fn();
    render(<MemoryCard card={card} onClick={handleClick} />);

    expect(screen.getByText("🐶")).toBeInTheDocument();
  });
});
