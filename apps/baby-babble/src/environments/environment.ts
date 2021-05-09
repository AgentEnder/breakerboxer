// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environmentDev } from 'libs/xplat/core/src/lib/environments/base/environment.dev';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';

import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {
  firebase: {
    apiKey: 'AIzaSyBiWP-5B0UsTBGd5TP6TPAVW8AZPjU0Ckg',
    authDomain: 'babybabble-6ab62.firebaseapp.com',
    projectId: 'babybabble-6ab62',
    storageBucket: 'babybabble-6ab62.appspot.com',
    messagingSenderId: '441468446585',
    appId: '1:441468446585:web:33f7e13c05cd702702b1a8',
    measurementId: 'G-WG5K4Y43JN',
    databaseURL: 'https://babybabble-6ab62.firebaseio.com/',
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
