import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// libs
import { TranslateService } from '@ngx-translate/core';

import { throwIfAlreadyLoaded } from '@tbs/xplat/utils';

// app
import { environment } from './environments/environment';
import { LogService } from './services/log.service';
import { PlatformLanguageToken } from './services/tokens';
import { WindowService } from './services/window.service';
import { UIEffects } from './state/ui/ui.effects';
import { uiReducer } from './state/ui/ui.reducer';

/**
 * DEBUGGING
 */
LogService.DEBUG.LEVEL_4 = !environment.production;

@NgModule({
  imports: [CommonModule,
    StoreModule.forRoot({
      ui: uiReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([UIEffects])
  ],
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and others per platform
  static forRoot(
    configuredProviders: Array<any>
  ): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LogService,
        WindowService,
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        ...configuredProviders,
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    @Inject(PlatformLanguageToken) lang: string,
    translate: TranslateService
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // ensure default platform language is set
    translate.use(lang);
  }
}
