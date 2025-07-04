import { renderHook, act } from "@testing-library/react";
import { useAutoRefresh } from "../useAutoRefresh";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const baseDate = new Date("2023-01-01T00:00:00Z");

vi.useFakeTimers();

describe("useAutoRefresh", () => {
  const mockOnApply = vi.fn();
  const mockAddRecentRange = vi.fn();

  const defaultParams = {
    showRelative: false,
    mode: "range" as const,
    relativeFrom: "now-15m",
    relativeTo: "now",
    startDate: baseDate,
    endDate: new Date(baseDate.getTime() + 1000 * 60 * 15),
    multiRanges: [],
    onApply: mockOnApply,
    addRecentRange: mockAddRecentRange,
  };

  beforeEach(() => {
    mockOnApply.mockClear();
    mockAddRecentRange.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should not auto-refresh by default", () => {
    const { result } = renderHook(() => useAutoRefresh(defaultParams));

    expect(result.current.isPaused).toBe(true);
    vi.advanceTimersByTime(10000);
    expect(mockOnApply).not.toHaveBeenCalled();
  });

  it("should call onApply after interval when auto-refresh is active", () => {
    const { result } = renderHook(() => useAutoRefresh(defaultParams));

    act(() => {
      result.current.setIsPaused(false);
      result.current.setRefreshInterval(1); // 1 minute
      result.current.setIntervalUnit("m");
    });

    vi.advanceTimersByTime(60_000);
    expect(mockOnApply).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(60_000);
    expect(mockOnApply).toHaveBeenCalledTimes(2);
  });

  it("should stop auto-refresh when paused", () => {
    const { result } = renderHook(() => useAutoRefresh(defaultParams));

    act(() => {
      result.current.setIsPaused(false);
      result.current.setRefreshInterval(1);
      result.current.setIntervalUnit("m");
    });

    vi.advanceTimersByTime(60_000);
    expect(mockOnApply).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.setIsPaused(true);
    });

    vi.advanceTimersByTime(60_000);
    expect(mockOnApply).toHaveBeenCalledTimes(1); // no more calls
  });

  it("should handle single mode correctly", () => {
    const { result } = renderHook(() =>
      useAutoRefresh({
        ...defaultParams,
        mode: "single",
      })
    );

    act(() => {
      result.current.handleApply();
    });

    expect(mockOnApply).toHaveBeenCalledWith({
      startDate: baseDate,
      endDate: null,
      multiRanges: [],
    });

    expect(mockAddRecentRange).toHaveBeenCalledWith({
      type: "single",
      start: baseDate,
    });
  });

  it("should handle multi-range mode correctly", () => {
    const multi = [
      { start: baseDate, end: new Date(baseDate.getTime() + 60000) },
      {
        start: new Date(baseDate.getTime() + 120000),
        end: new Date(baseDate.getTime() + 180000),
      },
    ];

    const { result } = renderHook(() =>
      useAutoRefresh({
        ...defaultParams,
        mode: "multi-range",
        multiRanges: multi,
      })
    );

    act(() => {
      result.current.handleApply();
    });

    expect(mockOnApply).toHaveBeenCalledWith({
      startDate: expect.any(Date),
      endDate: null,
      multiRanges: multi,
    });

    expect(mockAddRecentRange).toHaveBeenCalledWith({
      type: "multi-range",
      ranges: multi,
    });
  });

  it("should handle relative mode correctly", () => {
    const { result } = renderHook(() =>
      useAutoRefresh({
        ...defaultParams,
        showRelative: true,
        relativeFrom: "now-5m",
        relativeTo: "now",
      })
    );

    act(() => {
      result.current.handleApply();
    });

    const { startDate, endDate, multiRanges } = mockOnApply.mock.calls[0][0];

    expect(startDate).toBeInstanceOf(Date);
    expect(endDate).toBeInstanceOf(Date);
    expect(multiRanges).toEqual([]);

    expect(mockAddRecentRange).toHaveBeenCalledWith({
      type: "range",
      start: expect.any(Date),
      end: expect.any(Date),
    });

    // Дополнительная проверка на корректный интервал (разница 5 минут ± 5 сек)
    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    expect(diff).toBeGreaterThanOrEqual(295_000);
    expect(diff).toBeLessThanOrEqual(305_000);
  });
});
