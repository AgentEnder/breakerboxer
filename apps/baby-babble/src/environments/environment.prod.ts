import { environmentProd } from 'libs/xplat/core/src/lib/environments/base/environment.prod';
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
    databaseURL: 'https://babybabble-6ab62-default-rtdb.firebaseio.com/',
  },
};

export const environment = deepMerge(environmentProd, overrides);
