/**
 * Log Errors in a standardized way
 * @export
 * @param {Error} error
 */
export function logError(error) {
  console.error('Error: ', error.message, '\n\nStack: ', error.stack);
}
