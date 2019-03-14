import { useState } from 'react';
import produce, { Draft } from 'immer';

export function useImmerState<T = any>(
  initial: T
): [T, (s: (draft: Draft<T>) => void) => void] {
  const [s, set] = useState<T>(initial);
  return [s, (fn: (t: Draft<T>) => void) => void set(produce(fn) as any)];
}
