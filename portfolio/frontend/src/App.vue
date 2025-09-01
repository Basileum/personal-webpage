<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useProjectsStore } from '@/stores/projects'
import { useExperienceStore } from '@/stores/experience'
import { useThemeStore } from '@/stores/theme'
import { useLanguageStore } from '@/stores/language'
import Header from '@/components/Header.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import Footer from '@/components/Footer.vue'

const profileStore = useProfileStore()
const projectsStore = useProjectsStore()
const experienceStore = useExperienceStore()
const themeStore = useThemeStore()
const languageStore = useLanguageStore()

const profile = ref({
  name: 'Portfolio',
  title: 'Developer & Consultant',
  location: 'Location',
  email: 'basile.audard@outlook.com',
  github: 'https://github.com/basileaudard',
  linkedin: 'https://linkedin.com/in/basileaudard'
})

const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')
const isLanguageMenuOpen = ref(false)

onMounted(async () => {
  console.log('App mounted - current language:', languageStore.currentLanguage)
  try {
    await profileStore.fetchProfile(languageStore.currentLanguage)
    await projectsStore.fetchProjects(languageStore.currentLanguage)
    await experienceStore.fetchExperiences(languageStore.currentLanguage)
    if (profileStore.profile) {
      profile.value = profileStore.profile
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
  
  // Add scroll event listener for section highlighting
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    // Close mobile menu after navigation
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
  const sections = ['hero', 'about', 'projects', 'experience', 'contact']
  const scrollPosition = window.scrollY + 100 // Offset for header height
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const changeLanguage = async (lang: string) => {
  console.log('Changing language to:', lang)
  languageStore.setLanguage(lang)
  isLanguageMenuOpen.value = false
  
  // Refresh data with new language
  try {
    await profileStore.fetchProfile(lang)
    await projectsStore.fetchProjects(lang)
    await experienceStore.fetchExperiences(lang)
    if (profileStore.profile) {
      profile.value = profileStore.profile
    }
    console.log('Data refreshed for language:', lang)
  } catch (error) {
    console.error('Failed to fetch data with new language:', error)
  }
}

const getLanguageName = (lang: string): string => {
  const names = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  }
  return names[lang as keyof typeof names] || 'English'
}

const getLanguageFlag = (lang: string): string => {
  const flags = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷'
  }
  return flags[lang as keyof typeof flags] || '🇺🇸'
}


</script>

<template>
  <div id="app">
    <Header 
      :active-section="activeSection"
      :is-mobile-menu-open="isMobileMenuOpen"
      @scroll-to-section="scrollToSection"
      @toggle-mobile-menu="toggleMobileMenu"
    />
    
    <main class="main-content">
      <HeroSection :profile="profile" />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
    
    <!-- Fixed Controls -->
    <div class="fixed-controls">
      <div class="control-item">
        <button @click="toggleLanguageMenu" class="control-button" :title="'Current: ' + getLanguageName(languageStore.currentLanguage)">
          <span class="current-flag">{{ getLanguageFlag(languageStore.currentLanguage) }}</span>
        </button>
        
        <!-- Language Menu -->
        <div v-if="isLanguageMenuOpen" class="language-menu">
          <button @click="changeLanguage('en')" class="language-option" :class="{ 'active': languageStore.currentLanguage === 'en' }">
            <span class="flag">🇺🇸</span>
            <span class="name">English</span>
          </button>
          <button @click="changeLanguage('es')" class="language-option" :class="{ 'active': languageStore.currentLanguage === 'es' }">
            <span class="flag">🇪🇸</span>
            <span class="name">Español</span>
          </button>
          <button @click="changeLanguage('fr')" class="language-option" :class="{ 'active': languageStore.currentLanguage === 'fr' }">
            <span class="flag">🇫🇷</span>
            <span class="name">Français</span>
          </button>
        </div>
      </div>
      <!-- Theme Toggle -->
      <div class="control-item">
        <button @click="themeStore.toggleTheme()" class="control-button" :title="themeStore.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <span v-if="themeStore.theme === 'dark'" class="control-icon">☀️</span>
          <span v-else class="control-icon">🌙</span>
        </button>
      </div>
      
      <!-- Language Toggle -->
      
    </div>
  </div>
</template>

<style>
/* App-specific styles only */
#app {
  min-height: 100vh;
}

/* Fixed Controls */
.fixed-controls {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
}

.control-item {
  position: relative;
}

.control-button {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(24px) saturate(180%);
  position: relative;
  overflow: hidden;
}

.control-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.1) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.control-button::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.15) 100%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.control-button:hover {
  transform: translateY(-1px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.4);
  color: var(--accent);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
}

.control-button:hover::before {
  opacity: 1;
}

.control-button:hover::after {
  opacity: 1;
}

.control-icon {
  font-size: 1.2rem;
}

.current-flag {
  font-size: 1.5rem;
}

/* Language Menu */
.language-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 1rem;
  background: var(--panel);
  border: 1px solid var(--ring);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1001;
  min-width: 160px;
  backdrop-filter: blur(10px);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.language-option:hover {
  background: rgba(122, 162, 255, 0.1);
  color: var(--accent);
}

.language-option.active {
  background: rgba(122, 162, 255, 0.2);
  color: var(--accent);
}

.flag {
  font-size: 1.2rem;
}

.name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Light theme styles */
html[style*="--bg: #ffffff"] .control-button {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

html[style*="--bg: #ffffff"] .control-button:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

html[style*="--bg: #ffffff"] .language-menu {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .fixed-controls {
    bottom: 1rem;
    right: 1rem;
  }
  
  .control-button {
    width: 3rem;
    height: 3rem;
  }
  
  .control-icon {
    font-size: 1rem;
  }
  
  .current-flag {
    font-size: 1.25rem;
  }
}
</style>
