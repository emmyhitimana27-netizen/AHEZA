import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

const ThemeContext = createContext(null)

/* AHEZA 2050 always defaults to dark — but this context
   allows future light/system toggle without refactor.      */
const THEME_KEY = 'aheza-theme'
const VALID_THEMES = ['dark', 'light', 'system']

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(THEME_KEY)
  if (stored && VALID_THEMES.includes(stored)) return stored
  // Respect OS preference but default to dark for brand identity
  return 'dark'
}

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }
  return theme
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)
  const resolved = resolveTheme(theme)

  /* Apply theme class to <html> */
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    root.setAttribute('data-theme', resolved)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme, resolved])

  /* Listen for OS preference changes (only when theme = 'system') */
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => setThemeState('system') // force re-resolve
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) =>
      prev === 'dark' ? 'light' : 'dark'
    )
  }, [])

  const value = {
    theme,
    resolved,
    isDark:  resolved === 'dark',
    isLight: resolved === 'light',
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export default ThemeContext