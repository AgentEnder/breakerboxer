import { NgModule } from '@angular/core';

import { LayoutModule } from '@tbs/layout';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';

@NgModule({
  imports: [CoreModule, SharedModule, LayoutModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
