import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Experience {
  title: string
  company: string
  startDate: string
  endDate?: string
  location: string
  technologies?: string[]
  content: string
  slug: string
}

export const useExperienceStore = defineStore('experience', () => {
  const experiences = ref<Experience[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchExperiences = async (lang?: string): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const url = lang ? `/api/experience?lang=${lang}` : '/api/experience'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch experiences')
      }
      
      const data = await response.json()
      experiences.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching experiences:', err)
    } finally {
      loading.value = false
    }
  }

  const getExperienceBySlug = (slug: string): Experience | undefined => {
    return experiences.value.find(experience => experience.slug === slug)
  }

  return {
    experiences,
    loading,
    error,
    fetchExperiences,
    getExperienceBySlug
  }
})
