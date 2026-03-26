import { projects } from '@/data/projects'
import type { Project } from '@/types'

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true)
  })

  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('every project has required fields', () => {
    projects.forEach((p: Project) => {
      expect(typeof p.id).toBe('string')
      expect(typeof p.title).toBe('string')
      expect(typeof p.description).toBe('string')
      expect(typeof p.url).toBe('string')
    })
  })

  it('every project URL is a valid http/https URL', () => {
    projects.forEach((p: Project) => {
      expect(p.url).toMatch(/^https?:\/\//)
    })
  })
})
