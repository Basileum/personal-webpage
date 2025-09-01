<template>
  <section id="projects" class="section">
    <div class="section-content">
      <h2>{{ t('sections.projects.title') }}</h2>
      <p class="section-subtitle">{{ t('sections.projects.subtitle') }}</p>
      <div v-if="projectsStore.loading" class="loading">{{ t('sections.projects.loading') }}</div>
      <div v-else-if="projectsStore.error" class="error">{{ t('sections.projects.error') }}</div>
      <div v-else class="projects-grid">
        <article 
          v-for="project in projectsStore.projects" 
          :key="project.slug" 
          class="project-card"
          @click="openProjectModal(project)"
        >
          <div class="project-image">
            <img :src="getProjectCardImage(project)" :alt="project.title" />
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p class="client">{{ project.client }}</p>
            <div v-if="project.technologies && project.technologies.length > 0" class="technologies">
              <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
              <span v-if="project.technologies && project.technologies.length > 3" class="tech-tag more">
                +{{ project.technologies.length - 3 }} {{ t('sections.projects.more') }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Project Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProjectModal">&times;</button>
        
        <div class="modal-header">
          <h2>{{ selectedProject.title }}</h2>
          <p class="modal-client">{{ selectedProject.client }}</p>
        </div>

        <!-- Image Gallery -->
                  <div v-if="projectImages.length > 0" class="image-gallery">
            <div class="gallery-main">
              <img 
                :src="currentImage" 
                :alt="selectedProject.title" 
                class="gallery-main-image"
                @error="handleImageError"
              />
            <div v-if="projectImages.length > 1" class="gallery-nav">
              <button 
                class="gallery-nav-btn prev" 
                @click="previousImage"
                :disabled="currentImageIndex === 0"
              >
                ‹
              </button>
              <button 
                class="gallery-nav-btn next" 
                @click="nextImage"
                :disabled="currentImageIndex === projectImages.length - 1"
              >
                ›
              </button>
            </div>
          </div>
          
          <div v-if="projectImages.length > 1" class="gallery-thumbnails">
            <img 
              v-for="(image, index) in projectImages" 
              :key="index"
              :src="image" 
              :alt="`${selectedProject.title} - Image ${index + 1}`"
              class="gallery-thumbnail"
              :class="{ active: index === currentImageIndex }"
              @click="setCurrentImage(index)"
              @error="handleImageError"
            />
          </div>
        </div>

        <div class="modal-body">
          <div v-if="selectedProject.technologies && selectedProject.technologies.length > 0" class="modal-technologies">
            <h3>{{ t('sections.projects.technologies') }}</h3>
            <div class="tech-tags">
              <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div class="modal-description">
            <div v-html="selectedProject.content"></div>
          </div>
        </div>

        <div class="modal-footer">
          <a v-if="selectedProject.demoUrl && selectedProject.demoUrl !== '#'" 
             :href="selectedProject.demoUrl" 
             target="_blank" 
             class="modal-btn demo">
            <span class="demo-icon">🌐</span>
            {{ t('sections.projects.viewDemo') }}
          </a>
          <a v-if="selectedProject.githubUrl && selectedProject.githubUrl !== '#'" 
             :href="selectedProject.githubUrl" 
             target="_blank" 
             class="modal-btn github">
            {{ t('sections.projects.viewCode') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjectsStore } from '@/stores/projects'
import { useLanguageStore } from '@/stores/language'
import i18n from '@/i18n'

interface Project {
  slug: string
  title: string
  client: string
  date: string
  image: string
  technologies?: string[]
  content: string
  demoUrl: string
  githubUrl: string
}

const { t } = useI18n()
const projectsStore = useProjectsStore()
const languageStore = useLanguageStore()

// Modal state
const selectedProject = ref<Project | null>(null)
const currentImageIndex = ref(0)

// Project images state
const projectImages = ref<string[]>([])
const projectCardImages = ref<Record<string, string>>({})

// Fetch projects with current language
const fetchProjectsWithLanguage = async () => {
  console.log('Fetching projects with language:', languageStore.currentLanguage)
  console.log('Current i18n locale:', i18n.global.locale.value)
  await projectsStore.fetchProjects(languageStore.currentLanguage)
}

// Function to get the first image for project cards
const getProjectCardImage = (project: Project): string => {
  // Return cached first image if available, otherwise fallback to main image
  return projectCardImages.value[project.slug] || project.image
}

// Function to pre-fetch first image for a project card
const fetchProjectCardImage = async (project: Project) => {
  try {
    const response = await fetch(`/api/project-images/${project.slug}`)
    if (response.ok) {
      const data = await response.json()
      if (data.images && data.images.length > 0) {
        // Cache the first image for the project card
        projectCardImages.value[project.slug] = data.images[0]
      }
    }
  } catch (error) {
    console.error('Error fetching project card image:', error)
  }
}

// Function to fetch project images
const fetchProjectImages = async (projectSlug: string) => {
  try {
    const response = await fetch(`/api/project-images/${projectSlug}`)
    if (response.ok) {
      const data = await response.json()
      // Use the first discovered image as the main image
      if (data.images && data.images.length > 0) {
        projectImages.value = data.images
      } else {
        // Fallback to the main project image if no additional images found
        projectImages.value = [selectedProject.value!.image]
      }
    }
  } catch (error) {
    console.error('Error fetching project images:', error)
    // Fallback to just the main image
    projectImages.value = [selectedProject.value!.image]
  }
}

// Watch for language changes and refetch projects
watch(() => languageStore.currentLanguage, async (newLang) => {
  console.log('Language changed to:', newLang)
  if (newLang) {
    // Clear cached images when language changes
    projectCardImages.value = {}
    projectImages.value = []
    
    // Fetch projects with new language
    await fetchProjectsWithLanguage()
  }
}, { immediate: true })

// Also fetch projects on component mount if they haven't been loaded yet
onMounted(async () => {
  if (projectsStore.projects.length === 0) {
    await fetchProjectsWithLanguage()
  }
})

// Watch for when projects are loaded to fetch images
watch(() => projectsStore.projects, (projects) => {
  console.log('Projects loaded:', projects?.length, 'Language:', languageStore.currentLanguage)
  if (projects && projects.length > 0) {
    projects.forEach((project: Project) => {
      fetchProjectCardImage(project)
    })
  }
}, { immediate: true })

const currentImage = computed(() => {
  return projectImages.value[currentImageIndex.value] || ''
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(languageStore.currentLanguage, {
    year: 'numeric',
    month: 'long'
  })
}

const openProjectModal = async (project: Project) => {
  selectedProject.value = project
  currentImageIndex.value = 0
  document.body.style.overflow = 'hidden' // Prevent background scrolling
  
  // Fetch project images
  await fetchProjectImages(project.slug)
}

const closeProjectModal = () => {
  selectedProject.value = null
  currentImageIndex.value = 0
  document.body.style.overflow = '' // Restore scrolling
}

const nextImage = () => {
  if (currentImageIndex.value < projectImages.value.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
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
  font-size: 2.5rem;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--ring);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Light theme project cards */
html[style*="--bg: #ffffff"] .project-card {
  background: rgba(0, 0, 0, 0.02);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Light theme hover */
html[style*="--bg: #ffffff"] .project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  background: #0e1530;
}

/* Light theme project image */
html[style*="--bg: #ffffff"] .project-image {
  background: #f1f5f9;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--ink);
}

.project-content .client {
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.project-content .date {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--accent);
  color: var(--bg);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tech-tag.more {
  background: var(--muted);
  color: var(--ink);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--bg);
  border-radius: 16px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--ring);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--muted);
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}

.modal-header {
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid var(--ring);
}

.modal-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--ink);
}

.modal-client {
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.modal-date {
  color: var(--muted);
  font-size: 0.9rem;
}

/* Image Gallery */
.image-gallery {
  padding: 1rem 2rem;
}

.gallery-main {
  position: relative;
  margin-bottom: 1rem;
}

.gallery-main-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 12px;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.gallery-nav-btn {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease;
}

.gallery-nav-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.9);
}

.gallery-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.gallery-thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.gallery-thumbnail:hover {
  border-color: var(--accent);
}

.gallery-thumbnail.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent);
}

/* Modal Body */
.modal-body {
  padding: 1rem 2rem;
}

.modal-technologies {
  margin-bottom: 2rem;
}

.modal-technologies h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--ink);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.modal-description h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--ink);
}

.modal-description :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--ink);
}

.modal-description :deep(ul) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.modal-description :deep(li) {
  margin-bottom: 0.5rem;
  color: var(--ink);
}

/* Modal Footer */
.modal-footer {
  padding: 1rem 2rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.modal-btn.demo {
  background: var(--accent);
  color: var(--bg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-btn.demo:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.demo-icon {
  font-size: 1.1rem;
}

.no-demo-message {
  color: var(--muted);
  font-style: italic;
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid var(--ring);
}

.modal-btn.github {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ring);
}

.modal-btn.github:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--accent);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    max-width: 100%;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  
  .modal-header h2 {
    font-size: 1.5rem;
  }
  
  .image-gallery {
    padding: 1rem 1.5rem;
  }
  
  .gallery-main-image {
    height: 250px;
  }
  
  .modal-body {
    padding: 1rem 1.5rem;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    flex-direction: column;
  }
  
  .gallery-thumbnails {
    gap: 0.25rem;
  }
  
  .gallery-thumbnail {
    width: 60px;
    height: 45px;
  }
}
</style>
