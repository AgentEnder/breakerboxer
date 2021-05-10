import { NgModule, Optional, SkipSelf } from '@angular/core';

// nativescript
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { Device } from '@nativescript/core';
// libs
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TNSFontIconModule, USE_STORE } from 'nativescript-ngx-fonticon';

import { CoreModule, PlatformLanguageToken, PlatformWindowToken } from '@tbs/xplat/core';
import { fontAwesomeIcons } from '@tbs/xplat/nativescript/utils';
import { throwIfAlreadyLoaded } from '@tbs/xplat/utils';

import { MobileTranslateLoader } from './services/mobile-translate.loader';
// app
import { MobileWindowService } from './services/mobile-window.service';

// factories
export function platformLangFactory() {
  return Device.language;
}

export function createTranslateLoader() {
  return new MobileTranslateLoader('/assets/i18n/');
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    TNSFontIconModule.forRoot({}),
    CoreModule.forRoot([
      {
        provide: PlatformLanguageToken,
        useFactory: platformLangFactory,
      },
      {
        provide: PlatformWindowToken,
        useClass: MobileWindowService,
      },
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
      },
    }),
  ],
  providers: [
    {
      // inline icons to avoid extra file handling on app boot
      provide: USE_STORE,
      useValue: {
        fa: fontAwesomeIcons,
      },
    },
  ],
})
export class TbsCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: TbsCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'TbsCoreModule');
  }
}
