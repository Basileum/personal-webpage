<template>
  <section id="contact" class="section">
    <div class="section-content">
      <h2>{{ t('sections.contact.title') }}</h2>
      <div class="contact-buttons">
        <a :href="profileStore.profile?.github || '#'" target="_blank" rel="noopener" class="contact-button github">
          <span class="button-text">GitHub</span>
        </a>
        <a :href="profileStore.profile?.linkedin || '#'" target="_blank" rel="noopener" class="contact-button linkedin">
          <span class="button-text">LinkedIn</span>
        </a>
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

.section-content h2 {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--ink);
}

.contact-buttons {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--ring);
  border-radius: 16px;
  text-decoration: none;
  color: var(--ink);
  transition: all 0.3s ease;
  min-width: 140px;
}

.contact-button:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  color: var(--accent);
}

.button-text {
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .contact-buttons {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .contact-button {
    padding: 1.5rem 2rem;
    min-width: 200px;
  }
  
  .section-content h2 {
    font-size: 2rem;
  }
}
</style>
