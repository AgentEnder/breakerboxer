// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {baseEnvironment, IEnvironmentConfiguration} from '@breakerboxer/core';
import {deepMerge} from '@breakerboxer/utils'

export const overrides: Partial<IEnvironmentConfiguration> = {
  firebase: {
    apiKey: 'AIzaSyDKLr4qjSsBANvhQyR5MmvYoeC65yCNibY',
    authDomain: 'emu-compat.firebaseapp.com',
    projectId: 'emu-compat',
    storageBucket: 'emu-compat.appspot.com',
    messagingSenderId: '113976152784',
    appId: '1:113976152784:web:f684f626ae2e7417e104d5',
    measurementId: 'G-HKX0PN0797',
    databaseURL: ''
  }
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
