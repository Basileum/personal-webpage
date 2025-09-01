import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Project {
  title: string
  date: string
  client: string
  technologies?: string[]
  image: string
  demoUrl: string
  githubUrl: string
  content: string
  slug: string
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProjects = async (lang?: string): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      const url = lang ? `/api/projects?lang=${lang}` : '/api/projects'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      
      const data = await response.json()
      projects.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching projects:', err)
    } finally {
      loading.value = false
    }
  }

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.value.find(project => project.slug === slug)
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProjectBySlug
  }
})
