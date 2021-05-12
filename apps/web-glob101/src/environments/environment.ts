// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentDev } from 'libs/xplat/core/src/lib/environments/base/environment.dev';
import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';

import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {
  firebase: {
    apiKey: 'AIzaSyAMaZaftIcDkxQw0-AYHvp5RDahzWHRpUQ',
    authDomain: 'glob101-9383c.firebaseapp.com',
    databaseURL: 'https://glob101-9383c.firebaseio.com',
    projectId: 'glob101-9383c',
    storageBucket: 'glob101-9383c.appspot.com',
    messagingSenderId: '137453619226',
    appId: '1:137453619226:web:85f733a2abefd5249e69a3',
    measurementId: 'G-RHYFT0P1D6',
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
