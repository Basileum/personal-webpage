<template>
  <header class="main-header">
    <div class="header-container">
      <div class="logo">
        <h1>BAZTECH.EU</h1>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="nav-menu desktop-nav">
        <div class="nav-slider" :style="sliderStyle"></div>
        <button @click="scrollToSection('about')" class="nav-item">{{ t('nav.about') }}</button>
        <button @click="scrollToSection('projects')" class="nav-item">{{ t('nav.projects') }}</button>
        <button @click="scrollToSection('experience')" class="nav-item">{{ t('nav.experience') }}</button>
        <button @click="scrollToSection('contact')" class="nav-item">{{ t('nav.contact') }}</button>
      </nav>

      <!-- Mobile Hamburger Menu -->
      <button @click="toggleMobileMenu" class="hamburger-menu" :class="{ 'close': isMobileMenuOpen }">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <nav class="mobile-nav-menu">
          <button @click="scrollToSection('about')" class="mobile-nav-item" :class="{ 'active': activeSection === 'about' }">{{ t('nav.about') }}</button>
          <button @click="scrollToSection('projects')" class="mobile-nav-item" :class="{ 'active': activeSection === 'projects' }">{{ t('nav.projects') }}</button>
          <button @click="scrollToSection('experience')" class="mobile-nav-item" :class="{ 'active': activeSection === 'experience' }">{{ t('nav.experience') }}</button>
          <button @click="scrollToSection('contact')" class="mobile-nav-item" :class="{ 'active': activeSection === 'contact' }">{{ t('nav.contact') }}</button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  activeSection: string
  isMobileMenuOpen: boolean
}

interface Emits {
  (e: 'scroll-to-section', sectionId: string): void
  (e: 'toggle-mobile-menu'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const sliderStyle = computed(() => {
  const sections = ['about', 'projects', 'experience', 'contact']
  const activeIndex = sections.indexOf(props.activeSection)
  
  if (activeIndex === -1) {
    return { transform: 'translateX(-100%)', opacity: '0' }
  }
  
  // Get the actual navigation element
  const navElement = document.querySelector('.desktop-nav')
  if (!navElement) {
    return { opacity: '0' }
  }
  
  const navItems = navElement.querySelectorAll('.nav-item')
  if (navItems.length === 0 || activeIndex >= navItems.length) {
    return { opacity: '0' }
  }
  
  const activeItem = navItems[activeIndex] as HTMLElement
  const navRect = navElement.getBoundingClientRect()
  const itemRect = activeItem.getBoundingClientRect()
  
  // Calculate position relative to the navigation container
  const left = itemRect.left - navRect.left
  const width = itemRect.width
  
  return {
    transform: `translateX(${left}px)`,
    width: `${width}px`,
    opacity: '1'
  }
})

const scrollToSection = (sectionId: string) => {
  emit('scroll-to-section', sectionId)
}

const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(16, 25, 54, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--ring);
  transition: all 0.3s ease;
}

/* Light theme header */
html[style*="--bg: #ffffff"] .main-header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--ring);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.nav-item {
  background: none;
  border: none;
  color: var(--ink);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.nav-item:hover {
  color: var(--accent);
}

.nav-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(122, 162, 255, 0.1);
  border: 1.5px solid var(--accent);
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: -1;
}

.hamburger-menu {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: padding 0.4s ease;
}

.hamburger-menu:not(.close):hover {
  padding: 6px 10px;
}

.bar {
  margin: 5px 3px;
  width: 25px;
  height: 3px;
  background: var(--ink);
  border-radius: 1.5px;
  transition: margin 0.4s, transform 0.4s;
  -webkit-transition: margin 0.4s, -webkit-transform 0.4s;
  transition: margin 0.4s, -webkit-transform 0.4s;
  -o-transition: margin 0.4s, transform 0.4s;
  transition: margin 0.4s, transform 0.4s;
  transition: margin 0.4s, transform 0.4s, -webkit-transform 0.4s;
}

.hamburger-menu:not(.close):hover .bar {
  margin: 5px 3px;
}

.hamburger-menu.close .bar:first-child {
  -webkit-transform: translateY(10px) rotate(45deg);
  -ms-transform: translateY(10px) rotate(45deg);
  transform: translateY(10px) rotate(45deg);
}

.hamburger-menu.close .bar:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.close .bar:last-child {
  -webkit-transform: translateY(-6px) rotate(-45deg);
  -ms-transform: translateY(-6px) rotate(-45deg);
  transform: translateY(-6px) rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(16, 25, 54, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--ring);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.5s ease;
  pointer-events: none;
}

/* Light theme mobile nav */
html[style*="--bg: #ffffff"] .mobile-nav {
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid var(--ring);
}

.mobile-nav.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: all;
}

.mobile-nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.mobile-nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item {
  background: none;
  border: none;
  color: var(--ink);
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.4s ease;
  text-align: left;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: var(--accent);
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .hamburger-menu {
    display: inline-block;
  }
}
</style>
