/**
 * ============================================================================
 *  CAP-06 — CSRF PROTECTION (EMA §25, §6.10)
 *  CSRF token generation and validation for form submissions.
 * ============================================================================
 */

const CSRF_TOKEN_KEY = 'csrf_token';
const CSRF_TOKEN_LENGTH = 32;

/** Generate a random CSRF token */
export function generateCsrfToken(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/** Store CSRF token in session storage */
export function storeCsrfToken(): string {
  const token = generateCsrfToken();
  sessionStorage.setItem(CSRF_TOKEN_KEY, token);
  return token;
}

/** Get stored CSRF token */
export function getCsrfToken(): string | null {
  return sessionStorage.getItem(CSRF_TOKEN_KEY);
}

/** Validate a CSRF token against stored token */
export function validateCsrfToken(token: string): boolean {
  const stored = getCsrfToken();
  if (!stored || !token) return false;
  // Constant-time comparison to prevent timing attacks
  if (stored.length !== token.length) return false;
  let result = 0;
  for (let i = 0; i < stored.length; i++) {
    result |= stored.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return result === 0;
}

/** Add CSRF token to fetch request headers */
export function withCsrfHeaders(headers: Record<string, string> = {}): Record<string, string> {
  const token = getCsrfToken() || storeCsrfToken();
  return { ...headers, 'X-CSRF-Token': token };
}
