import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { ProjectsService } from './services/projects.service';

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [
        LocalStorageService,
        ProjectsService
    ],
})
export class CoreModule {}
