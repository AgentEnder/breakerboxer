// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentProd } from 'libs/xplat/core/src/lib/environments/base/environment.prod';
import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';

import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {};

export const environment = deepMerge(environmentProd, overrides);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
