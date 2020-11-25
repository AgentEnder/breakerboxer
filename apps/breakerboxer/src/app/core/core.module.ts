import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@breakerboxer/utils';
import { StoreModule } from '@ngrx/store';

import { ThrottleEventDirective } from './directives/throttle-event.directive';
import { LocalStorageService } from './services/local-storage.service';
import { ProjectsService } from './services/projects.service';

const CORE_DIRECTIVES = [ThrottleEventDirective];

@NgModule({
  declarations: [...CORE_DIRECTIVES],
  imports: [CommonModule],
  exports: [...CORE_DIRECTIVES],
  providers: [LocalStorageService, ProjectsService],
})
export class CoreModule {

}
