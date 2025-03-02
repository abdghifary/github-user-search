import type { Mock } from 'vitest';

declare global {
  type MockedFunction<T extends (...args: unknown[]) => unknown> = Mock<
    Parameters<T>,
    ReturnType<T>
  >;

  type MockedModule<T> = {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown
      ? MockedFunction<T[K]>
      : T[K];
  };
}
