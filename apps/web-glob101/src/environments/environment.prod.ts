import { environmentProd } from 'libs/xplat/core/src/lib/environments/base/environment.prod';
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

export const environment = deepMerge(environmentProd, overrides);
