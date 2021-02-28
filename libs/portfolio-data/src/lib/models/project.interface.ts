import { ProjectMetadata } from './project-metadata.interface';

export interface Project extends ProjectMetadata {
  markdownContent: string;
}
