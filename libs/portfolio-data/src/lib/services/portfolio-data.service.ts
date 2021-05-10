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
    markdownDescription: `Utiliclub is a full stack SaaS product that leverages ASP.NET Core + Angular 8 to allow club leaders and universities to more effectively market and lead organizations.`,
  },
  {
    id: 'DD648EBA-785E-4B9E-AC6A-B52C04118ADE',
    title: 'BreakerBoxer',
    tags: ['misc'],
    technologyUsed: ['Firebase', 'Angular', 'Nx'],
    markdownContent: '',
    markdownDescription:
      "BreakerBoxer is an application that allows homeowners or electricians to map out what components are controlled by each circuit in a home's electrical panel.",
    sourceCodeLink: 'https://github.com/AgentEnder/breakerboxer/tree/master/apps/breakerboxer',
    liveDemoLink: 'https://breakerboxer-506ed.web.app/home',
  },
  {
    id: '28278297-A5B7-428A-8C14-791EF337E32E',
    title: 'EmuCompat',
    tags: ['Angular, Firebase, Nx, InProgress'],
    technologyUsed: ['Firebase', 'Angular', 'Nx'],
    markdownContent: '',
    markdownDescription:
      "This site allows users to rate a game they are emulating based on the system that they are currently playing it on. This allows other user's to gauge how it should perform when they emulate it on similar hardware.",
    sourceCodeLink: 'https://github.com/AgentEnder/breakerboxer/tree/master/apps/emu-compat',
    liveDemoLink: 'https://emu-compat.web.app/',
  },
  {
    id: 'E6E1A242-1488-48C9-84E1-31EB5FE89547',
    title: 'HouseSortable',
    tags: ['Angular, Firebase'],
    technologyUsed: ['Firebase', 'Angular'],
    markdownContent: '',
    markdownDescription:
      'This is a project built while we were evaluating houses to buy. Its purpose is to allow homebuyers to evaluate houses, list pros and cons and save a preference order while looking for their new dream home.',
    sourceCodeLink: 'https://github.com/AgentEnder/HouseSortable',
    liveDemoLink: 'https://housesortable.web.app/',
  },
  {
    id: '460FF820-B1AE-4128-86F7-6D9E19EFAFAA',
    title: 'Portfolio Site',
    tags: ['Angular, Nx, InProgress'],
    technologyUsed: ['Angular', 'Nx'],
    markdownContent: '',
    markdownDescription: "This is the site you're currently looking at.",
    sourceCodeLink: 'https://github.com/AgentEnder/breakerboxer/tree/master/apps/web-portfolio',
    liveDemoLink: '#',
  },
];
