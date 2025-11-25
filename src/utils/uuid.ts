import { randomUUID } from 'node:crypto';
import { validate as uuidValidate } from 'uuid';

export function generateId(): string {
  return randomUUID();
}

export function validateId(id: string) {
  return uuidValidate(id);
}
