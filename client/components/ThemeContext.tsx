import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'pink'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : null
      return (saved === 'light' || saved === 'dark' || saved === 'pink') ? saved : 'dark'
    } catch (e) {
      return 'dark'
    }
  })

  useEffect(() => {
    try {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark', 'pink')
      root.classList.add(theme)
      localStorage.setItem('theme', theme)
    } catch (e) {
      // Ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
