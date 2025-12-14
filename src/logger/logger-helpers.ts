import type { LogLevel } from '@nestjs/common';

export const formatLogMessage = (message: any) => {
  if (typeof message === 'string') return message;
  try {
    return JSON.stringify(message);
  } catch {
    return String(message);
  }
};

export const getLogLevels = (level: number): LogLevel[] => {
  if (level <= 0) {
    return ['error'];
  }

  if (level === 1) {
    return ['error', 'warn'];
  }

  if (level === 2) {
    return ['error', 'warn', 'log'];
  }

  if (level === 3) {
    return ['error', 'warn', 'log', 'debug'];
  }

  return ['error', 'warn', 'log', 'debug', 'verbose'];
};
