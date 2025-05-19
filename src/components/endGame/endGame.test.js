import { render, screen, act } from "@testing-library/react";
import EndGame from "./EndGame.js";

describe("EndGame message", () => {
  test("should render the end game image timer message and flips message", () => {
    jest.useFakeTimers();

    const elapsedTime = 45;
    render(<EndGame className="end-game" elapsedTime={elapsedTime} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const wonImage = screen.getByAltText(/you won/i);
    expect(wonImage).toBeInTheDocument();

    const flipsMessage = screen.getByTestId(/end-game/i);
    expect(flipsMessage).toBeInTheDocument();

    const timeMessage = screen.getByTestId(/end-game/i);
    expect(timeMessage).toBeInTheDocument();

    jest.useRealTimers();
  });
});
