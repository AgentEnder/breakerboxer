import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as d3 from 'd3';
import { HierarchyNode } from 'd3';

@Component({
  selector: 'app-skills-tab',
  templateUrl: './skills-tab.component.html',
  styleUrls: ['./skills-tab.component.scss'],
})
export class SkillsTabComponent implements AfterViewInit {
  @ViewChild('svgContainer') container: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.container.nativeElement.appendChild(
      chart(60, {
        name: 'Root',
        children: [
          {
            name: 'Web',
            children: [
              {
                name: 'JavaScript',
                children: [
                  {
                    name: 'Angular',
                    children: [
                      {
                        name: 'NgRx',
                        value: 1,
                      },
                      {
                        name: 'RxJS',
                        value: 1,
                      },
                      {
                        name: 'Angular Material',
                        value: 1,
                      },
                      {
                        name: 'Kendo UI',
                        value: 1,
                      },
                    ],
                  },
                  {
                    name: 'Vue',
                    value: 1,
                  },
                ],
              },
              {
                name: 'CSS',
                children: [
                  {
                    name: 'SCSS',
                    value: 1,
                  },
                  {
                    name: 'Tailwind CSS',
                    value: 1,
                  },
                ],
              },
              {
                name: 'HTML',
                children: [
                  {
                    name: 'Bootstrap 3/4',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'API',
            children: [
              {
                name: 'C# ASP.NET 5',
                children: [
                  {
                    name: 'Entity Framework',
                    value: 1,
                  },
                  {
                    name: 'OData',
                    value: 1,
                  },
                ],
              },
              {
                name: 'NEST JS',
                children: [
                  {
                    name: 'TypeORM',
                    value: 1,
                  },
                  {
                    name: 'PassportJS',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'Mobile',
            children: [
              {
                name: 'NativeScript',
                value: 1,
              },
              {
                name: 'Flutter',
                value: 0.5,
              },
              {
                name: 'Android SDK',
                value: 1,
              },
            ],
          },
          {
            name: 'Databases',
            children: [
              {
                name: 'NoSQL',
                children: ['Firestore'],
              },
              {
                name: 'Relational',
                children: [
                  {
                    name: 'MSSQL',
                    value: 1,
                  },
                  {
                    name: 'MYSQL',
                    value: 1,
                  },
                  {
                    name: 'SQLite',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'Tooling',
            children: [
              {
                name: 'Nx',
                children: [
                  {
                    name: 'xplat',
                    value: 1,
                  },
                  {
                    name: 'Custom Schematics',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'DevOps',
            children: [
              {
                name: 'Azure Devops',
                children: [
                  {
                    name: 'Pipelines',
                    value: 1,
                  },
                  {
                    name: 'Boards',
                    value: 1,
                  },
                  {
                    name: 'Test Plans',
                    value: 1,
                  },
                ],
              },
            ],
          },
        ],
      })
    );
  }
}

const chart = (radius, data: any) => {
  const root = partition(radius, data) as HierarchyNode<any>;
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

  const svg = d3.create('svg');

  svg
    .append('g')
    .attr('fill-opacity', 0.6)
    .selectAll('path')
    .data(root.descendants().filter((d) => d.depth))
    .join('path')
    .attr('fill', (d) => {
      while (d.depth > 1) {
        d = d.parent;
      }
      return color(d.data.name);
    })
    .attr('d', (d) => arc(radius)(d))
    .append('title')
    .text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join('/')}\n${format(d.value)}`
    );

  svg
    .append('g')
    // .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')
    .attr('font-size', 1.5)
    .attr('font-family', 'sans-serif')
    .selectAll('text')
    .data(root.descendants().filter((d: any) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 1))
    .join('text')
    .attr('transform', (d: any) => {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr('dy', '0.35em')
    .text((d: any) => d.data.name);

  return svg.attr('viewBox', autoBox).node();
};

function autoBox(): any {
  document.body.appendChild(this);
  const { x, y, width, height } = this.getBBox();
  document.body.removeChild(this);
  return [x, y, width, height];
}

const partition = (radius, data) =>
  d3.partition().size([2 * Math.PI, radius])(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );

const arc = (radius) =>
  d3
    .arc<any>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 0.5);

const format = d3.format(',d');

export type CoordinatePair = { x0: number; x1: number; y0: number; y1: number };
export type RequiredProps<T> = { name: string; value: number; children?: RequiredProps<T>[] };
