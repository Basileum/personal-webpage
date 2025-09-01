import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setLocale } from '@/i18n'

export const useLanguageStore = defineStore('language', () => {
  // Initialize with saved language or default to 'en'
  const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('portfolio-language') : null
  const currentLanguage = ref(savedLanguage || 'en')

  const setLanguage = (lang: string) => {
    console.log('Setting language to:', lang)
    currentLanguage.value = lang
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', lang)
    }
    // Update i18n locale
    setLocale(lang)
    console.log('Language set to:', lang, 'i18n locale updated')
  }

  const getCurrentLanguage = () => {
    return currentLanguage.value
  }

  // Initialize language on store creation
  const initializeLanguage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language')
      console.log('Language store initialization - saved language:', saved)
      if (saved && ['en', 'es', 'fr'].includes(saved)) {
        currentLanguage.value = saved
        // Update i18n locale on initialization
        setLocale(saved)
        console.log('Language store initialized with:', saved)
      } else {
        console.log('Language store initialized with default: en')
      }
    }
  }

  // Call initialization
  initializeLanguage()

  return {
    currentLanguage,
    setLanguage,
    getCurrentLanguage
  }
})
