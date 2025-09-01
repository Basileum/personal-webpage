<template>
  <section id="experience" class="section">
    <div class="section-content">
      <h2>{{ t('sections.experience.title') }}</h2>
      <!-- <p class="section-subtitle">{{ t('sections.experience.subtitle') }}</p> -->
      
      <div v-if="experienceStore.loading" class="loading">{{ t('sections.experience.loading') }}</div>
      <div v-else-if="experienceStore.error" class="error">{{ t('sections.experience.error') }}</div>
      <div v-else class="timeline-wrapper">
        <div class="timeline">
          <div class="timeline-line"></div>
          
          <div 
            v-for="(experience, index) in experienceStore.experiences" 
            :key="experience.slug" 
            class="timeline-item"
            :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1 }"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-card" @click="selectExperience(experience)">
              <div class="card-header">
                <h3>{{ experience.title }}</h3>
                <div class="company">{{ experience.company }}</div>
              </div>
              <div class="card-details">
                <div class="dates">
                  {{ formatDate(experience.startDate) }} - {{ experience.endDate ? formatDate(experience.endDate) : t('sections.experience.present') }}
                </div>
                <div class="location">{{ experience.location }}</div>
              </div>
              <div v-if="experience.technologies && experience.technologies.length > 0" class="tech-stack">
                <span 
                  v-for="tech in experience.technologies.slice(0, 4)" 
                  :key="tech" 
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
                <span 
                  v-if="experience.technologies && experience.technologies.length > 4" 
                  class="tech-more"
                >
                  +{{ experience.technologies.length - 4 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CV Download Button -->
      <div class="cv-download-section">
        <button @click="downloadCV" class="cv-download-button">
          <span class="download-icon">📄</span>
          <span class="download-text">{{ t('sections.experience.downloadCV') }}</span>
        </button>
      </div>
      
      <!-- Experience Detail Modal -->
      <div v-if="selectedExperience" class="modal-overlay" @click="closeExperienceModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedExperience.title }}</h2>
            <button @click="closeExperienceModal" class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="experience-detail-header">
              <p class="company">{{ selectedExperience.company }}</p>
              <p class="dates">{{ formatDate(selectedExperience.startDate) }} - {{ selectedExperience.endDate ? formatDate(selectedExperience.endDate) : t('sections.experience.present') }}</p>
              <p class="location">{{ selectedExperience.location }}</p>
            </div>
            <div v-if="selectedExperience.technologies && selectedExperience.technologies.length > 0" class="technologies-list">
              <span v-for="tech in selectedExperience.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
            <div class="experience-detail-content" v-html="selectedExperience.content"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useExperienceStore } from '@/stores/experience'
import { useLanguageStore } from '@/stores/language'

const { t } = useI18n()
const experienceStore = useExperienceStore()
const languageStore = useLanguageStore()

const selectedExperience = ref<any>(null)

const formatDate = (dateString: string): string => {
  return new Date(dateString).getFullYear().toString()
}

const selectExperience = (experience: any) => {
  selectedExperience.value = experience
}

const closeExperienceModal = () => {
  selectedExperience.value = null
}

const downloadCV = () => {
  const currentLang = languageStore.currentLanguage
  let cvFileName = ''
  
  if (currentLang === 'es') {
    cvFileName = 'CV_ES_Basile_Audard.pdf'
  } else {
    // English and French use the English CV
    cvFileName = 'CV_BI_Basile_Audard_EN.pdf'
  }
  
  // Create a temporary link element
  const link = document.createElement('a')
  link.href = `/${cvFileName}`
  link.download = cvFileName
  link.target = '_blank'
  
  // Trigger the download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.section {
  padding: 4rem 0;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-content h2 {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--ink);
}

.section-subtitle {
  text-align: center;
  color: var(--muted);
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--muted);
}

.error {
  color: #ff6b6b;
}

/* Timeline Wrapper */
.timeline-wrapper {
  position: relative;
  padding: 2rem 0;
}

/* Timeline Container */
.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--accent), rgba(122, 162, 255, 0.3));
  transform: translateX(-50%);
  z-index: 1;
}

/* Timeline Items */
.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  width: 45%;
  z-index: 2;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 55%;
  text-align: left;
}

/* Timeline Dot */
.timeline-dot {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: var(--accent);
  border: 4px solid var(--bg);
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 3;
  box-shadow: 0 0 0 4px rgba(122, 162, 255, 0.2);
  transition: all 0.3s ease;
}

.timeline-item.left .timeline-dot {
  right: -10px;
}

.timeline-item.right .timeline-dot {
  left: -10px;
}

.timeline-item:hover .timeline-dot {
  transform: translateY(-50%) scale(1.2);
  box-shadow: 0 0 0 6px rgba(122, 162, 255, 0.3);
}

/* Timeline Cards */
.timeline-card {
  background: var(--panel);
  border: 1px solid var(--ring);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/**  .timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), rgba(122, 162, 255, 0.5));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}*/

.timeline-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 12px 40px rgba(122, 162, 255, 0.2);
}

.timeline-card:hover::before {
  transform: scaleX(1);
}

/* Card Header */
.card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.card-header .company {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0;
}

/* Card Details */
.card-details {
  margin: 1.5rem 0;
}

.card-details .dates {
  font-size: 0.95rem;
  color: var(--muted);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.card-details .location {
  font-size: 0.9rem;
  color: var(--muted);
  opacity: 0.8;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.tech-tag {
  background: rgba(122, 162, 255, 0.1);
  color: var(--accent);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(122, 162, 255, 0.2);
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background: rgba(122, 162, 255, 0.2);
  transform: translateY(-1px);
}

.tech-more {
  background: var(--muted);
  color: var(--bg);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--bg);
  border: 1px solid var(--ring);
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid var(--ring);
}

.modal-header h2 {
  margin: 0;
  color: var(--ink);
  font-size: 1.8rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.05);
}

.modal-body {
  padding: 2rem;
}

.experience-detail-header {
  margin-bottom: 2rem;
}

.experience-detail-header .company {
  color: var(--accent);
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.experience-detail-header .dates {
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.experience-detail-header .location {
  color: var(--muted);
  margin-bottom: 1rem;
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.experience-detail-content {
  line-height: 1.8;
  color: var(--ink);
}

.experience-detail-content :deep(h1) {
  font-size: 1.75rem;
  margin: 2rem 0 1rem 0;
  color: var(--ink);
}

.experience-detail-content :deep(h2) {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem 0;
  color: var(--ink);
}

.experience-detail-content :deep(p) {
  margin-bottom: 1rem;
}

.experience-detail-content :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.experience-detail-content :deep(li) {
  margin-bottom: 0.5rem;
}

/* Light theme styles */
html[style*="--bg: #ffffff"] .timeline-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

html[style*="--bg: #ffffff"] .timeline-card:hover {
  box-shadow: 0 12px 40px rgba(122, 162, 255, 0.15);
}

html[style*="--bg: #ffffff"] .modal-content {
  background: #ffffff;
  border-color: #e2e8f0;
}

/* CV Download Section */
.cv-download-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--ring);
}

.cv-download-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cv-download-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.download-icon {
  font-size: 1.2rem;
}

.download-text {
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-line {
    left: 2rem;
  }
  
  .timeline-item {
    width: calc(100% - 5rem);
    left: 0 !important;
    text-align: left !important;
    padding-left: 4rem;
  }
  
  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 1rem !important;
    right: auto !important;
  }
  
  .timeline-card {
    padding: 1.5rem;
  }
  
  .card-header h3 {
    font-size: 1.3rem;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .timeline-item {
    padding-left: 3rem;
  }
  
  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 0.5rem !important;
  }
  
  .timeline-line {
    left: 1.5rem;
  }
  
  .timeline-card {
    padding: 1rem;
  }
}
</style>
