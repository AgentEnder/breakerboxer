import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnChanges, OnInit } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IElectricalComponent, IRoom } from '@tbs/xplat/base/breakerboxer-data';

import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-sidebar-treeview',
  templateUrl: './sidebar-treeview.component.html',
  styleUrls: ['./sidebar-treeview.component.scss'],
})
export class SidebarTreeviewComponent implements OnInit {
  treeControl = new NestedTreeControl<TreeNode>((node: TreeNode) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  data: TreeNode[] = [];

  constructor(public projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.rooms$.subscribe((rooms) => {
      if (rooms) {
        this.data = rooms.map((x) => ({
          breaker: null,
          children: x.components.map(
            (y: IElectricalComponent): TreeNode => ({
              breaker: y.breaker?.name,
              children: [],
              name: y.name,
            })
          ),
          name: x.name,
        }));
      } else {
        this.data = [];
      }
      this.dataSource.data = this.data;
    });
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}

interface TreeNode {
  name: string;
  breaker: string;
  children: TreeNode[];
}
