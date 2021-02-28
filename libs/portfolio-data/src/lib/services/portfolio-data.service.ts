import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectMetadata } from '../models';
import { Project } from '../models/project.interface';

@Injectable({ providedIn: 'root' })
export class PortfolioProjectsService {
  constructor() {}

  loadPortfolioProjects(): Observable<ProjectMetadata[]> {
    return of<ProjectMetadata[]>(SAMPLE_DATA);
  }

  loadProjectByTitle(projectTitle): Observable<Project> {
    return of<Project>(SAMPLE_DATA.find((x) => x.title === projectTitle));
  }
}

const SAMPLE_DATA: Project[] = [
  {
    id: '582B5900-540F-4BB8-8884-DA1DD1185B5B',
    title: 'Utiliclub',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular'],
    markdownContent: '',
  },
  {
    id: 'DD648EBA-785E-4B9E-AC6A-B52C04118ADE',
    title: 'BreakerBoxer',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular', 'Nx'],
    markdownContent: '',
  },
  {
    id: '28278297-A5B7-428A-8C14-791EF337E32E',
    title: 'EmuCompat',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular', 'Nx'],
    markdownContent: '',
  },
  {
    id: '460FF820-B1AE-4128-86F7-6D9E19EFAFAA',
    title: 'Portfolio Site',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular', 'Nx'],
    markdownContent: '',
  },
  {
    id: 'CFD77484-4FDC-44CF-BC05-E64996F25235',
    title: 'Ludum Dare 40',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular'],
    markdownContent: '',
  },
  {
    id: '565E360F-0DF7-4753-84DE-079CC170B8C2',
    title: 'Lorem Some Blog',
    tags: ['misc'],
    technologyUsed: ['C#', 'Angular'],
    markdownContent: '',
  },
  {
    id: '8036B2C9-E4C3-446C-8C10-68D9A780B090',
    title: 'Lorem Some Blog',
    tags: [],
    technologyUsed: [],
    markdownContent: '',
  },
];
