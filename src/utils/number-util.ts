export const intRange = (start: number, end: number): number[] =>
  Array.from({ length: Math.abs(end - start) + 1 }).map((_, i) =>
    start <= end ? start + i : start - i
  );
