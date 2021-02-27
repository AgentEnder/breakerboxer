import { NgModule } from '@angular/core';

// libs
import { environment } from '../environments/environment';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LayoutModule } from '@tbs/layout';

@NgModule({
  imports: [CoreModule, SharedModule, LayoutModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
