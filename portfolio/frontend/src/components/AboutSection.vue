<template>
  <section id="about" class="section">
    <div class="section-content">
      <div class="profile-content" v-html="profileStore.profile?.content || ''"></div>
      
      
      
      <!-- Technical Skills Categories -->
      <div v-if="profileStore.profile?.technicalSkills" class="technical-skills-section">
        <h3 class="skills-title">{{ t('sections.about.technicalSkills') }}</h3>
        <div class="technical-categories">
          <!-- Frontend -->
          <div v-if="profileStore.profile.technicalSkills.front && profileStore.profile.technicalSkills.front.length > 0" class="skill-category">
            <h4 class="category-title">{{ t('sections.about.frontend') }}</h4>
            <div class="skill-badges">
              <span 
                v-for="skill in profileStore.profile.technicalSkills.front" 
                :key="skill" 
                class="skill-badge technical front"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <!-- Backend -->
          <div v-if="profileStore.profile.technicalSkills.back && profileStore.profile.technicalSkills.back.length > 0" class="skill-category">
            <h4 class="category-title">{{ t('sections.about.backend') }}</h4>
            <div class="skill-badges">
              <span 
                v-for="skill in profileStore.profile.technicalSkills.back" 
                :key="skill" 
                class="skill-badge technical back"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <!-- Data -->
          <div v-if="profileStore.profile.technicalSkills.data && profileStore.profile.technicalSkills.data.length > 0" class="skill-category">
            <h4 class="category-title">{{ t('sections.about.data') }}</h4>
            <div class="skill-badges">
              <span 
                v-for="skill in profileStore.profile.technicalSkills.data" 
                :key="skill" 
                class="skill-badge technical data"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <!-- Infrastructure -->
          <div v-if="profileStore.profile.technicalSkills.infra && profileStore.profile.technicalSkills.infra.length > 0" class="skill-category">
            <h4 class="category-title">{{ t('sections.about.infrastructure') }}</h4>
            <div class="skill-badges">
              <span 
                v-for="skill in profileStore.profile.technicalSkills.infra" 
                :key="skill" 
                class="skill-badge technical infra"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <!-- Tools -->
          <div v-if="profileStore.profile.technicalSkills.tools && profileStore.profile.technicalSkills.tools.length > 0" class="skill-category">
            <h4 class="category-title">{{ t('sections.about.tools') }}</h4>
            <div class="skill-badges">
              <span 
                v-for="skill in profileStore.profile.technicalSkills.tools" 
                :key="skill" 
                class="skill-badge technical tools"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Soft Skills Badges -->
      <div v-if="profileStore.profile?.softSkills && profileStore.profile.softSkills.length > 0" class="soft-skills-section">
        <h3 class="skills-title">{{ t('sections.about.softSkills') }}</h3>
        <div class="soft-skills-badges">
          <div 
            v-for="skill in profileStore.profile.softSkills" 
            :key="skill" 
            class="skill-badge-wrapper"
          >
            <span class="skill-badge soft">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useProfileStore } from '@/stores/profile'

const { t } = useI18n()
const profileStore = useProfileStore()
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

.profile-content>h2 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center !important;
  margin-bottom: 3rem;
  color: var(--ink);
}

.profile-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  text-align: justify;
}

.profile-content :deep(h1) {
  font-size: 1.75rem;
  margin: 2rem 0 1rem 0;
}

.profile-content :deep(h2) {
  font-size: 2.25rem;
  margin: 1.5rem 0 1rem 0;
  text-align: center !important;
}

.profile-content :deep(p) {
  margin-bottom: 1rem;
  color: var(--ink);
}

.profile-content :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.1rem;
}

.profile-content :deep(li) {
  margin-bottom: 0.5rem;
  color: var(--ink);
}

.profile-content :deep(strong) {
  color: var(--ink);
}

/* Skills Sections */
.soft-skills-section,
.technical-skills-section {
  margin: 2rem auto;
  text-align: left;
  max-width: 800px;
}

.skills-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 1rem;
}

.soft-skills-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.technical-categories {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
}

.skill-category {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  padding-top: 2.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  width: 300px;
}

/* Light mode styles for skill categories */
html[style*="--bg: #ffffff"] .skill-category {
  background: radial-gradient(1000px 700px at 80% -10%, #e3f2fd 0%, #ffffff 50%),
radial-gradient(1200px 800px at -10% 120%, #f3e5f5 0%, #ffffff 60%),
#ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.category-title {
  position: absolute;
  top: -38px;
  left: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--bg);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* Light mode styles for category titles */
html[style*="--bg: #ffffff"] .category-title {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Light mode styles for skill badges */
html[style*="--bg: #ffffff"] .skill-badge {
  color: var(--ink);
}

html[style*="--bg: #ffffff"] .skill-badge.soft {
  color: var(--ink);
}

.skill-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-badge-wrapper {
  display: inline-block;
  padding: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  transition: all 0.6s ease;
}

.skill-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: transparent;
  color: white;
  border-radius: 18px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.6s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skill-badge.soft {
   background-color: color(srgb 0.043 0.0633 0.1262) !important
}

html[style*="--bg: #ffffff"] .skill-badge.soft {
  background-color: #ffffff !important;
}

.skill-badge.technical {
  background: rgba(255, 255, 255, 0.1);
}

.skill-badge.technical.front {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.skill-badge.technical.back {
  background: rgba(240, 147, 251, 0.2);
  border-color: rgba(240, 147, 251, 0.3);
}

.skill-badge.technical.data {
  background: rgba(79, 172, 254, 0.2);
  border-color: rgba(79, 172, 254, 0.3);
}

.skill-badge.technical.infra {
  background: rgba(67, 233, 123, 0.2);
  border-color: rgba(67, 233, 123, 0.3);
}

.skill-badge.technical.tools {
  background: rgba(250, 112, 154, 0.2);
  border-color: rgba(250, 112, 154, 0.3);
}

.skill-badge-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.skill-badge:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive design for badges */
@media (max-width: 768px) {
  .soft-skills-badges {
    gap: 0.375rem;
  }
  
  .skill-badge {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .technical-categories {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skill-category {
    padding: 1rem;
    padding-top: 2rem;
  }
  
  .category-title {
    font-size: 0.8rem;
    top: -10px;
    left: 10px;
    padding: 0.2rem 0.6rem;
  }
}
</style>
