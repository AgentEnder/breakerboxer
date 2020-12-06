// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { baseEnvironment, IEnvironmentConfiguration } from '@tbs/core';
import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironmentConfiguration> = {
  firebase: {
    apiKey: 'AIzaSyBRj7LacLaTYSCleIr1Zs1Yb5D3pQVdqjE',
    authDomain: 'breakerboxer-506ed.firebaseapp.com',
    databaseURL: 'https://breakerboxer-506ed.firebaseio.com',
    projectId: 'breakerboxer-506ed',
    storageBucket: 'breakerboxer-506ed.appspot.com',
    messagingSenderId: '919281519773',
    appId: '1:919281519773:web:8372a61a3bf4e61ba55874',
    measurementId: 'G-XJLCKBDWH4',
  },
};

export const environment = deepMerge(baseEnvironment, overrides);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
