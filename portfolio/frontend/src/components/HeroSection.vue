<template>
  <section id="hero" class="hero-section">
    <div class="hero-content">
      <div class="hero-image">
        <img src="/images/profile-photo.png" alt="Profile Photo" />
      </div>
      
      <div class="hero-text">
        <h1 class="hero-title">{{ profile.name }}</h1>
        <p class="hero-subtitle" v-html="profile.title"></p>
        
        <div class="hero-actions">
          <a :href="profile.github" class="hero-button secondary" target="_blank" rel="noopener">GitHub</a>
          <a :href="profile.linkedin" class="hero-button secondary" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </div>
    
    <div v-if="showScrollArrow" class="scroll-indicator" @click="scrollToAbout">
      <img src="/arrow-bottom.svg" alt="Scroll down" class="scroll-arrow" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Profile {
  name: string
  title: string
  location: string
  email: string
  github: string
  linkedin: string
}

interface Props {
  profile: Profile
}

defineProps<Props>()

const showScrollArrow = ref(false)
const isInHeroSection = ref(true)
let inactivityTimer: number | null = null

onMounted(() => {
  // Show scroll arrow after 3 seconds
  setTimeout(() => {
    showScrollArrow.value = true
  }, 3000)

  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
  
  // Cleanup on unmount
  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
  }
})

const handleScroll = () => {
  const heroSection = document.getElementById('hero')
  if (!heroSection) return

  const heroRect = heroSection.getBoundingClientRect()
  const isCurrentlyInHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight

  if (isCurrentlyInHero && !isInHeroSection.value) {
    // User returned to hero section
    isInHeroSection.value = true
    startInactivityTimer()
  } else if (!isCurrentlyInHero && isInHeroSection.value) {
    // User left hero section
    isInHeroSection.value = false
    showScrollArrow.value = false
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
  }
}

const startInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  
  inactivityTimer = window.setTimeout(() => {
    if (isInHeroSection.value) {
      showScrollArrow.value = true
    }
  }, 3000)
}

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.hero-text {
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.hero-location {
  font-size: 1.1rem;
  color: var(--muted);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 38px;
}

.hero-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.hero-button.primary {
  background: var(--accent);
  color: var(--bg);
}

.hero-button.primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.hero-button.secondary {
  background: transparent;
  color: var(--ink);
  border-color: var(--ring);
}

.hero-button.secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent);
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--accent);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: -1.5rem;
  cursor: pointer;
  animation: slideInFromBottom 1s ease-out;
  z-index: 10;
  width: 75px;
}

.scroll-arrow {
  width: 100%;
  height: auto;
  filter: var(--accent-filter);
  animation: slideDown 2s ease-in-out infinite;
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
}

@media (max-width: 768px) {
  .hero-content {
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-image img {
    width: 200px;
    height: 200px;
  }
  
  .hero-actions {
    justify-content: center;
  }
}
</style>
