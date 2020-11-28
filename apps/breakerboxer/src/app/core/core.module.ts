import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';

import { ProjectsService } from './services/projects.service';

@NgModule({
  imports: [CommonModule],
  providers: [ProjectsService],
})
export class CoreModule {

}
