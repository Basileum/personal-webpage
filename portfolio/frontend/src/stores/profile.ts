import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Profile {
  name: string
  title: string
  email: string
  location: string
  github: string
  linkedin: string
  website: string
  content: string
  softSkills?: string[]
  technicalSkills?: {
    front?: string[]
    back?: string[]
    data?: string[]
    infra?: string[]
    tools?: string[]
  }
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProfile = async (lang?: string): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const url = lang ? `/api/profile?lang=${lang}` : '/api/profile'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      
      const data = await response.json()
      profile.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching profile:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile
  }
})
