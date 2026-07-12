/**
 * ============================================================================
 *  CAP-01 — ACCESSIBILITY UTILITIES (EMA §6.10, WCAG 2.1 AA)
 *  Keyboard navigation, ARIA helpers, and contrast checking.
 * ============================================================================
 */

/** Focus trap for modals (WCAG 2.4.3) */
export function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeydown);
  first?.focus();

  return () => container.removeEventListener('keydown', handleKeydown);
}

/** Announce to screen readers (live region) */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  let region = document.getElementById('sr-announcer');
  if (!region) {
    region = document.createElement('div');
    region.id = 'sr-announcer';
    region.setAttribute('aria-live', priority);
    region.setAttribute('aria-atomic', 'true');
    region.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)';
    document.body.appendChild(region);
  }
  region.textContent = '';
  requestAnimationFrame(() => { region!.textContent = message; });
}

/** Keyboard shortcut handler */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options?: { ctrl?: boolean; shift?: boolean; alt?: boolean }
): () => void {
  function handler(e: KeyboardEvent) {
    if (e.key !== key) return;
    if (options?.ctrl && !e.ctrlKey && !e.metaKey) return;
    if (options?.shift && !e.shiftKey) return;
    if (options?.alt && !e.altKey) return;
    e.preventDefault();
    callback();
  }

  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}

/** Get accessible color contrast ratio */
export function getContrastRatio(fg: string, bg: string): number {
  const luminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map(x => {
      const v = parseInt(x, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const l1 = Math.max(luminance(fg), luminance(bg));
  const l2 = Math.min(luminance(fg), luminance(bg));
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Check if contrast meets WCAG AA (4.5:1 for normal text) */
export function meetsWcagAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 4.5;
}
