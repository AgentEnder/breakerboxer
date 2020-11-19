import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { ProjectsService } from './services/projects.service';
import { ThrottleEventDirective } from './directives/throttle-event.directive';

const CORE_DIRECTIVES = [
    ThrottleEventDirective
];

@NgModule({
    declarations: [...CORE_DIRECTIVES],
    imports: [ CommonModule ],
    exports: [...CORE_DIRECTIVES],
    providers: [
        LocalStorageService,
        ProjectsService
    ],
})
export class CoreModule {}
