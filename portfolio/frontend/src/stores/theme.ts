import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Theme = 'dark' | 'light'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    applyTheme()
  }

  const applyTheme = () => {
    const root = document.documentElement
    
    if (theme.value === 'dark') {
      root.style.setProperty('--bg', '#0b1020')
      root.style.setProperty('--panel', '#11172e')
      root.style.setProperty('--ink', '#e6ecff')
      root.style.setProperty('--muted', '#9fb0d8')
      root.style.setProperty('--accent', '#7aa2ff')
      root.style.setProperty('--ring', '#283258')
    } else {
      root.style.setProperty('--bg', '#ffffff')
      root.style.setProperty('--panel', '#f8fafc')
      root.style.setProperty('--ink', '#1e293b')
      root.style.setProperty('--muted', '#64748b')
      root.style.setProperty('--accent', '#3b82f6')
      root.style.setProperty('--ring', '#e2e8f0')
    }
  }

  // Initialize theme on store creation
  applyTheme()

  return {
    theme,
    toggleTheme,
    setTheme,
    applyTheme
  }
})
