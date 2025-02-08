import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock console.error to keep test output clean
console.error = vi.fn();

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
