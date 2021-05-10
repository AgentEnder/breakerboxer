import { Component, OnInit } from '@angular/core';

import { Job } from '@tbs/portfolio-data';

@Component({
  selector: 'app-education-tab',
  templateUrl: './education-tab.component.html',
  styleUrls: ['./education-tab.component.scss'],
})
export class EducationTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  jobs: Job[] = [
    {
      company: 'Morehead State University',
      duties: [
        {
          titles: [
            {
              title: 'Bachelors of Science in Computer Science and Mathematics',
              start: new Date(2016, 7, 15),
              end: new Date(2020, 4, 15),
            },
          ],
          bullets: [
            {
              title: 'Courses',
              content:
                'Data Structures + Algorithms, Operating Systems, Machine Learning, Discrete Mathematics, Linear Algebra, Artificial Intelligence, Calculus I -> III',
            },
          ],
        },
      ],
    },
    {
      company: 'Lincoln County High School',
      duties: [
        {
          titles: [
            {
              title: 'General Education',
              start: new Date(2012, 7, 15),
              end: new Date(2016, 4, 15),
            },
          ],
          bullets: [],
        },
      ],
    },
  ];
}
