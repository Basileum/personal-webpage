import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

// Detect browser language
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en'
  const langCode = browserLang.split('-')[0].toLowerCase()
  
  // Map browser language to supported languages
  const supportedLanguages = ['en', 'fr', 'es']
  return supportedLanguages.includes(langCode) ? langCode : 'en'
}

// Get stored language preference or detect browser language
const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('portfolio-language')
  return stored || getBrowserLanguage()
}

const i18n = createI18n({
  legacy: false,
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    es
  }
})

// Function to change locale dynamically
export const setLocale = (locale: string) => {
  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale
  }
}

export default i18n

export const supportedLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]
