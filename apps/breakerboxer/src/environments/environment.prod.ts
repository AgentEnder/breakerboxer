import { environmentProd } from 'libs/xplat/core/src/lib/environments/base/environment.prod';
import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';

import { deepMerge } from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {
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

export const environment = deepMerge(environmentProd, overrides);
