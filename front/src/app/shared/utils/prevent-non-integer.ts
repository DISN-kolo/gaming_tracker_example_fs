const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'];

export function preventNonInteger(event: KeyboardEvent) {
  if (!ALLOWED_KEYS.includes(event.key) && !/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}
