import { describe, it, expect, beforeEach } from 'vitest';
import { generateCsrfToken, storeCsrfToken, getCsrfToken, validateCsrfToken } from '../../lib/csrf';

describe('CSRF Protection', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should generate random tokens', () => {
    const t1 = generateCsrfToken();
    const t2 = generateCsrfToken();
    expect(t1).not.toBe(t2);
    expect(t1.length).toBe(64); // 32 bytes = 64 hex chars
  });

  it('should store and retrieve token', () => {
    const token = storeCsrfToken();
    expect(getCsrfToken()).toBe(token);
  });

  it('should validate matching tokens', () => {
    const token = storeCsrfToken();
    expect(validateCsrfToken(token)).toBe(true);
  });

  it('should reject non-matching tokens', () => {
    storeCsrfToken();
    expect(validateCsrfToken('wrong-token')).toBe(false);
  });

  it('should reject empty tokens', () => {
    expect(validateCsrfToken('')).toBe(false);
  });
});
