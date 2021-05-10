import { Component, OnInit } from '@angular/core';

import { Job } from '@tbs/portfolio-data';

@Component({
  selector: 'app-career-tab',
  templateUrl: './career-tab.component.html',
  styleUrls: ['./career-tab.component.scss'],
})
export class CareerTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  jobs: Job[] = [
    {
      company: 'Universal Plant Services',
      duties: [
        {
          titles: [
            {
              title: 'Software Developer',
              start: new Date(2020, 7, 1),
            },
            {
              title: 'SDET',
              start: new Date(2020, 0, 8),
              end: new Date(2020, 7, 1),
            },
          ],
          bullets: [
            {
              title:
                'Design, implementation, and maintenance of in-app release notes for internal software, including analytic data.',
            },
            {
              title:
                'Design and implementation of a workflow engine built for automated and user-defined tasks.',
            },
            {
              title:
                'Worked in a team to build a new web and mobile framework for angular and nativescript applications, leveraging Nx + xplat. Conversion and modernization of legacy angular 4 applications to exist in the monorepo.',
            },
            {
              title:
                'Decoupled existing code by leveraging NgRx and data layer libraries, reducing circular dependencies and development overhead.',
            },
            {
              title:
                'Lead devops engineer for deploying affected applications to Azure in CI leveraging Azure Pipelines and Nx',
            },
          ],
        },
        {
          titles: [
            {
              title: 'Intern',
              start: new Date(2019, 8, 15),
              end: new Date(2020, 0, 8),
            },
          ],
          bullets: [
            {
              title: 'Documented API calls throughout existing applications to build dependency graphs',
              content:
                'Created C# console application to automate data entry into service now based on spreadsheet',
            },
          ],
        },
      ],
    },
    {
      company: 'Auburn University',
      duties: [
        {
          titles: [
            {
              title: 'Undergraduate Research Fellow',
              start: new Date(2019, 4, 15),
              end: new Date(2019, 6, 25),
            },
          ],
          bullets: [
            {
              title:
                'Implemented mobility and producer consumer data separation in pFogSim, a Fog network simulator.',
            },
            {
              title: 'Worked as a team to write research paper detailing the improvements to the simulator',
            },
          ],
        },
      ],
    },
    {
      company: 'Morehead State University',
      duties: [
        {
          titles: [
            {
              title: 'Undergraduate Research Fellow',
              start: new Date(2017, 7, 15),
              end: new Date(2019, 10, 30),
            },
          ],
          bullets: [
            {
              title:
                'Collected and performed analysis on social media datasets using machine learning and natural language processing.',
              content: `Used clustering and clique detection algorithms to locate hierarchical structures within youtube, reddit and twitter`,
            },
          ],
          documents: [
            {
              title:
                'Novel Machine Learning Algorithms for Centrality and Cliques Detection in Youtube Social Networks',
              href: 'https://aircconline.com/ijaia/V11N1/11120ijaia06.pdf',
            },
          ],
        },
        {
          titles: [
            {
              title: 'Facilities Management Intern',
              start: new Date(2016, 7, 30),
              end: new Date(2018, 10, 30),
            },
          ],
          bullets: [
            {
              title: 'Used python for data collection + automation of energy and electric data',
            },
          ],
        },
      ],
    },
    {
      company: 'Speedway LLC',
      duties: [
        {
          titles: [
            {
              title: 'Customer Service Representative',
              start: new Date(2018, 4, 15),
              end: new Date(2019, 8, 15),
            },
          ],
          bullets: [],
        },
      ],
    },
    {
      company: 'LSC Communications',
      duties: [
        {
          titles: [
            {
              title: 'Materials Handler (college program)',
              start: new Date(2018, 4, 15),
              end: new Date(2019, 8, 15),
            },
          ],
          bullets: [],
        },
      ],
    },
  ];
}
