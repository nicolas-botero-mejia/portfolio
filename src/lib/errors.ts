/**
 * Central error handling utilities.
 * Use for consistent logging and debugging across the project.
 */

const PREFIX = '[Error]';
const DEBUG = process.env.NODE_ENV === 'development';

/**
 * Log an error with context. In development, logs to console with full details.
 * In production, errors are swallowed unless NEXT_PUBLIC_LOG_ERRORS=true.
 */
export function logError(context: string, error: unknown): void {
  const shouldLog = DEBUG || process.env.NEXT_PUBLIC_LOG_ERRORS === 'true';

  if (shouldLog) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error(`${PREFIX} ${context}:`, message, stack ?? '');
  }
}

/**
 * Wrap an async function with try/catch. On error: logs and returns fallback.
 * Use for fire-and-forget operations that must not break the app.
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  context: string,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    logError(context, error);
    return fallback;
  }
}

/**
 * Wrap a sync function with try/catch. On error: logs and returns fallback.
 */
export function safeSync<T>(fn: () => T, context: string, fallback: T): T {
  try {
    return fn();
  } catch (error) {
    logError(context, error);
    return fallback;
  }
}

/**
 * Check if error is a "not found" style error (ENOENT, ENOTDIR, 404).
 */
export function isNotFoundError(error: unknown): boolean {
  const code = (error as NodeJS.ErrnoException)?.code;
  return code === 'ENOENT' || code === 'ENOTDIR';
}
