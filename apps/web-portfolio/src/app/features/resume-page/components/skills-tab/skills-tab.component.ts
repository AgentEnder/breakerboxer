import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as d3 from 'd3';

let counter = 0;
function newUid(prefix?: string) {
  return (prefix || '') + counter++;
}

@Component({
  selector: 'app-skills-tab',
  templateUrl: './skills-tab.component.html',
  styleUrls: ['./skills-tab.component.scss'],
})
export class SkillsTabComponent implements AfterViewInit {
  @ViewChild('svgContainer') container: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.container.nativeElement.appendChild(
      chart(954, 924, {
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
                      },
                      {
                        name: 'RxJS',
                      },
                      {
                        name: 'Angular Material',
                      },
                      {
                        name: 'Kendo UI',
                      },
                    ],
                  },
                  {
                    name: 'Vue',
                  },
                  {
                    name: 'React',
                  },
                ],
              },
              {
                name: 'CSS',
                children: [
                  {
                    name: 'SCSS',
                  },
                  {
                    name: 'Tailwind CSS',
                  },
                ],
              },
              {
                name: 'HTML',
                children: [
                  {
                    name: 'Bootstrap 3/4',
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
                name: 'Node',
                children: [
                  {
                    name: 'Nest JS',
                    value: 1,
                  },
                  {
                    name: 'Express',
                    value: 1,
                  },
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
              },
              {
                name: 'Flutter',
                value: 0.5,
              },
              {
                name: 'Android SDK',
              },
            ],
          },
          {
            name: 'Databases',
            children: [
              {
                name: 'NoSQL',
                children: [
                  {
                    name: 'Firestore',
                  },
                ],
              },
              {
                name: 'Relational',
                children: [
                  {
                    name: 'MSSQL',
                  },
                  {
                    name: 'MySQL',
                  },
                  {
                    name: 'SQLite',
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
                    name: 'Cross-Platform Code Sharing',
                  },
                  {
                    name: 'Custom Generators',
                  },
                  {
                    name: 'Custom Executors',
                  },
                ],
              },
            ],
          },
          {
            name: 'Integrations',
            children: [
              {
                name: 'Firebase',
                children: [
                  {
                    name: 'Hosting',
                  },
                  {
                    name: 'Firestore',
                  },
                  {
                    name: 'Realtime DB',
                  },
                  {
                    name: 'Authentication',
                  },
                ],
              },
              {
                name: 'Auth0',
              },
            ],
          },
          {
            name: 'DevOps',
            children: [
              {
                name: 'Azure DevOps',
                children: [
                  {
                    name: 'Pipelines',
                  },
                  {
                    name: 'Boards',
                  },
                  {
                    name: 'Test Plans',
                  },
                ],
              },
              {
                name: 'Github',
                children: [
                  {
                    name: 'Github Actions',
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

const chart = (width, height, data) => {
  const color = d3.scaleSequential([8, 0], d3.interpolateMagma);

  const tile = (node, x0, y0, x1, y1) => {
    d3.treemapBinary(node, 0, 0, width, height);
    for (const child of node.children) {
      child.x0 = x0 + (child.x0 / width) * (x1 - x0);
      child.x1 = x0 + (child.x1 / width) * (x1 - x0);
      child.y0 = y0 + (child.y0 / height) * (y1 - y0);
      child.y1 = y0 + (child.y1 / height) * (y1 - y0);
    }
  };

  const treemap = (data) =>
    d3.treemap().tile(tile).size([width, height]).paddingOuter(3).paddingTop(19).paddingInner(1).round(true)(
      d3
        .hierarchy(data)
        .sum((d) => (d.children?.length ? d.value || 0 : d.value || 1))
        .sort((a, b) => b.value - a.value)
    );
  const format = d3.format(',d');

  const root = treemap(data) as d3.HierarchyRectangularNode<{
    name: string;
    value: number;
    children?: Array<unknown>;
  }> & { clipUid: string; rectId: string };

  const svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`).style('font', '10px sans-serif');

  const shadow = newUid('shadow');

  svg
    .append('filter')
    .attr('id', shadow)
    .append('feDropShadow')
    .attr('flood-opacity', 0.3)
    .attr('dx', 0)
    .attr('stdDeviation', 3);

  const node = svg
    .selectAll('g')
    .data(d3.group(root, (d) => d.height))
    .join('g')
    .attr('filter', shadow)
    .selectAll('g')
    .data((d) => d[1])
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  node.append('title').text(
    (d) =>
      `${d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join('/')}\n${format(d.value)}`
  );

  node
    .append('rect')
    .attr('id', (d) => (d.rectId = newUid('node')))
    .attr('fill', (d) => color(d.height))
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0);

  node
    .append('clipPath')
    .attr('id', (d) => (d.clipUid = newUid('clip')))
    .append('use')
    .attr('xlink:href', (d) => {
      console.log(d);
      return `#${d.rectId}`;
    });

  node
    .append('text')
    .attr('clip-path', (d) => `url(#${d.clipUid})`)
    .selectAll('tspan')
    .data((d) => d.data.name.split('\n').concat(format(d.value)))
    .join('tspan')
    .attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
    .text((d) => d as string);

  node
    .filter((d) => !!d.children?.length)
    .selectAll('tspan')
    .attr('dx', 3)
    .attr('y', 13);

  node
    .filter((d) => !d.children)
    .selectAll('tspan')
    .attr('x', 3)
    .attr('y', (d, i, nodes) => `${(i === nodes.length - 1 ? 1 : 0) * 0.3 + 1.1 + i * 0.9}em`);

  // node
  //   .filter((d) => !!(d === root ? d.parent : d.children))
  //   .attr('cursor', 'pointer')
  //   .on('click', (event, d) => (d === root ? zoomout(root) : zoomin(d)));

  return svg.node();
};

// const chart = (width, height, data) => {
//   const x = d3.scaleLinear().rangeRound([0, width]);
//   const y = d3.scaleLinear().rangeRound([0, height]);
//   let counter = 0;

//   const treemap = (data) =>
//     d3.treemap().tile(tile)(
//       d3
//         .hierarchy(data)
//         .sum((d) => d.value)
//         .sort((a, b) => b.value - a.value)
//     );

//   const format = d3.format(',d');
//   const name = (d) =>
//     d
//       .ancestors()
//       .reverse()
//       .map((d) => d.data.name)
//       .join('/');

//   function tile(node, x0, y0, x1, y1) {
//     d3.treemapBinary(node, 0, 0, width, height);
//     for (const child of node.children) {
//       child.x0 = x0 + (child.x0 / width) * (x1 - x0);
//       child.x1 = x0 + (child.x1 / width) * (x1 - x0);
//       child.y0 = y0 + (child.y0 / height) * (y1 - y0);
//       child.y1 = y0 + (child.y1 / height) * (y1 - y0);
//     }
//   }

//   const svg = d3
//     .create('svg')
//     .attr('viewBox', `0.5 -30.5 ${width} ${height}`)
//     .style('font', '15px sans-serif');

//   let group = svg.append('g').call(render, treemap(data));

//   function render(group, root) {
//     const node = group.selectAll('g').data(root.children.concat(root)).join('g');

//     node
//       .filter((d) => (d === root ? d.parent : d.children))
//       .attr('cursor', 'pointer')
//       .on('click', (event, d) => (d === root ? zoomout(root) : zoomin(d)));

//     node.append('title').text((d) => `${name(d)}\n${format(d.value)}`);

//     node
//       .append('rect')
//       .attr('id', (d) => (d.leafUid = `leaf${counter++}`))
//       .attr('fill', (d) => (d === root ? '#fff' : d.children ? '#ccc' : '#ddd'))
//       .attr('stroke', '#fff');

//     node
//       .append('clipPath')
//       .attr('id', (d) => (d.clipUid = `clip${counter++}`))
//       .append('use')
//       .attr('xlink:href', (d) => d.leafUid.href);

//     node
//       .append('text')
//       .attr('clip-path', (d) => d.clipUid)
//       .attr('font-weight', (d) => (d === root ? 'bold' : null))
//       .selectAll('tspan')
//       .data((d) => (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
//       .join('tspan')
//       .attr('x', 3)
//       .attr('y', (d, i, nodes) => `${(i === (nodes.length - 1) ? 1 : 0) * 0.3 + 1.1 + i * 0.9}em`)
//       .attr('fill-opacity', (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
//       .attr('font-weight', (d, i, nodes) => (i === nodes.length - 1 ? 'normal' : null))
//       .text((d) => d);

//     group.call(position, root);
//   }

//   function position(group, root) {
//     group
//       .selectAll('g')
//       .attr('transform', (d) => (d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`))
//       .select('rect')
//       .attr('width', (d) => (d === root ? width : x(d.x1) - x(d.x0)))
//       .attr('height', (d) => (d === root ? 30 : y(d.y1) - y(d.y0)));
//   }

//   // When zooming in, draw the new nodes on top, and fade them in.
//   function zoomin(d) {
//     const group0: any = group.attr('pointer-events', 'none');
//     const group1: any = (group = svg.append('g').call(render, d));

//     x.domain([d.x0, d.x1]);
//     y.domain([d.y0, d.y1]);

//     svg
//       .transition()
//       .duration(750)
//       .call((t) => group0.transition(t).remove().call(position, d.parent))
//       .call((t) =>
//         group1
//           .transition(t)
//           .attrTween('opacity', () => d3.interpolate(0, 1))
//           .call(position, d)
//       );
//   }

//   // When zooming out, draw the old nodes on top, and fade them out.
//   function zoomout(d) {
//     const group0: any = group.attr('pointer-events', 'none');
//     const group1: any = (group = svg.insert('g', '*').call(render, d.parent));

//     x.domain([d.parent.x0, d.parent.x1]);
//     y.domain([d.parent.y0, d.parent.y1]);

//     svg
//       .transition()
//       .duration(750)
//       .call((t) =>
//         group0
//           .transition(t)
//           .remove()
//           .attrTween('opacity', () => d3.interpolate(1, 0))
//           .call(position, d)
//       )
//       .call((t) => group1.transition(t).call(position, d.parent));
//   }

//   return svg.node();
// };

export type CoordinatePair = { x0: number; x1: number; y0: number; y1: number };
export type RequiredProps<T> = { name: string; value: number; children?: RequiredProps<T>[] };
