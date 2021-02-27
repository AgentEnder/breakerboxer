import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';

import { ProjectsPageComponent } from './components';

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: ProjectsPageComponent },
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, SharedModule],
    exports: [],
    providers: [...COMPONENTS],
})
export class ProjectsPageModule { }