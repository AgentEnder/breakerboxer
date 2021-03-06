// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentDev } from 'libs/xplat/core/src/lib/environments/base/environment.dev';
import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';

import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {
  firebase: {
    apiKey: 'AIzaSyDKLr4qjSsBANvhQyR5MmvYoeC65yCNibY',
    authDomain: 'emu-compat.firebaseapp.com',
    projectId: 'emu-compat',
    storageBucket: 'emu-compat.appspot.com',
    messagingSenderId: '113976152784',
    appId: '1:113976152784:web:f684f626ae2e7417e104d5',
    measurementId: 'G-HKX0PN0797',
    databaseURL: '',
  },
};

export const environment = deepMerge(environmentDev, overrides);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
