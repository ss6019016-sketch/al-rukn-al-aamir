
export const MOBILE_BREAKPOINT_QUERY = '(max-width: 767.98px)';

export function isMobileViewport(): boolean {
  return window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
}
export function watchMobileViewport(onChange: (isMobile: boolean) => void): () => void {
  const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY);

  const listener = (e: MediaQueryListEvent) => onChange(e.matches);

  onChange(mql.matches);

  if (mql.addEventListener) {
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }

  // Safari <14 fallback
  mql.addListener(listener);
  return () => mql.removeListener(listener);
}