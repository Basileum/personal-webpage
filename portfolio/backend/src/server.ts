import express, { Request, Response } from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Types
interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  content: string;
  softSkills?: string[];
  technicalSkills?: {
    front?: string[];
    back?: string[];
    data?: string[];
    infra?: string[];
    tools?: string[];
  };
}

interface Project {
  title: string;
  date: string;
  client: string;
  technologies?: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  content: string;
  slug: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  location: string;
  technologies?: string[];
  content: string;
  slug: string;
}

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Configure marked for safe HTML rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

// API Routes
app.get('/api/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    // Get language from query parameter or default to 'en'
    const lang = req.query.lang as string || 'en';
    
    // Validate language
    if (!['en', 'es', 'fr'].includes(lang)) {
      res.status(400).json({ error: 'Invalid language' });
      return;
    }
    
    const profilePath = path.join(__dirname, '../../content', lang, 'profile.md');
    const content = await fs.readFile(profilePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    const profile: Profile = {
      name: data.name,
      title: data.title,
      email: data.email,
      location: data.location,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
      content: marked(markdownContent),
      softSkills: data.softSkills || [],
      technicalSkills: data.technicalSkills || []
    };
    
    res.json(profile);
  } catch (error) {
    console.error('Error reading profile:', error);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

app.get('/api/projects', async (req: Request, res: Response): Promise<void> => {
  try {
    // Get language from query parameter or default to 'en'
    const lang = req.query.lang as string || 'en';
    
    // Validate language
    if (!['en', 'es', 'fr'].includes(lang)) {
      res.status(400).json({ error: 'Invalid language' });
      return;
    }
    
    const projectsPath = path.join(__dirname, '../../content', lang, 'projects');
    const files = await fs.readdir(projectsPath);
    
    const projects: Project[] = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(projectsPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data, content: markdownContent } = matter(content);
          
          return {
            ...data as Project,
            content: marked(markdownContent),
            slug: file.replace('.md', '')
          };
        })
    );
    
    // Sort by date (newest first)
    projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.get('/api/experience', async (req: Request, res: Response): Promise<void> => {
  try {
    // Get language from query parameter or default to 'en'
    const lang = req.query.lang as string || 'en';
    
    // Validate language
    if (!['en', 'es', 'fr'].includes(lang)) {
      res.status(400).json({ error: 'Invalid language' });
      return;
    }
    
    const experiencePath = path.join(__dirname, '../../content', lang, 'experience');
    const files = await fs.readdir(experiencePath);
    
    const experiences: Experience[] = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(experiencePath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data, content: markdownContent } = matter(content);
          
          return {
            title: data.title,
            company: data.company,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            technologies: data.technologies,
            content: marked(markdownContent),
            slug: file.replace('.md', '')
          };
        })
    );
    
    // Sort by date (newest first)
    experiences.sort((a, b) => {
      const dateA = new Date(b.endDate || b.startDate).getTime();
      const dateB = new Date(a.endDate || a.startDate).getTime();
      return dateA - dateB;
    });
    
    res.json(experiences);
  } catch (error) {
    console.error('Error reading experience:', error);
    res.status(500).json({ error: 'Failed to load experience' });
  }
});

app.get('/api/project-images/:projectSlug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectSlug } = req.params;
    
    // Path to the project images folder
    const projectImagesPath = path.join(__dirname, '../../frontend/public/images/projects', projectSlug);
    
    try {
      // Check if the folder exists
      const files = await fs.readdir(projectImagesPath);
      
      // Filter for image files
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      });
      
      // Create full image paths
      const images = imageFiles.map(file => `/images/projects/${projectSlug}/${file}`);
      
      res.json({ images });
    } catch (folderError) {
      // If folder doesn't exist, return empty array
      res.json({ images: [] });
    }
  } catch (error) {
    console.error('Error reading project images:', error);
    res.status(500).json({ error: 'Failed to load project images' });
  }
});

// Serve Vue app for all other routes
app.get('*', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
