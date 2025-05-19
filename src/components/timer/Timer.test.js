import { render, act } from "@testing-library/react";
import Timer from "./Timer.js";

jest.useFakeTimers();

describe("Timer Component", () => {
  let onTimeUpdateMock;

  beforeEach(() => {
    onTimeUpdateMock = jest.fn();
  });

  test("should call onTimeUpdate with the correct elapsed time when active", () => {
    render(<Timer isActive={true} onTimeUpdate={onTimeUpdateMock} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onTimeUpdateMock).toHaveBeenCalledWith(2);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onTimeUpdateMock).toHaveBeenCalledWith(3);
  });

  test("should not call onTimeUpdate when inactive", () => {
    render(<Timer isActive={false} onTimeUpdate={onTimeUpdateMock} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onTimeUpdateMock).not.toHaveBeenCalled();
  });

  test("should clear the timer on unmount", () => {
    const { unmount } = render(
      <Timer isActive={true} onTimeUpdate={onTimeUpdateMock} />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onTimeUpdateMock).toHaveBeenCalledWith(1);

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onTimeUpdateMock).toHaveBeenCalledTimes(1);
  });
});
