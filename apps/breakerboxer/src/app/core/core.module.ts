import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';

import { ThrottleEventDirective } from './directives/throttle-event.directive';
import { ProjectsService } from './services/projects.service';

const CORE_DIRECTIVES = [ThrottleEventDirective];

@NgModule({
  declarations: [...CORE_DIRECTIVES],
  imports: [CommonModule],
  exports: [...CORE_DIRECTIVES],
  providers: [ProjectsService],
})
export class CoreModule {

}
