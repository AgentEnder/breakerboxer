import { IEnvironment } from 'libs/xplat/core/src/lib/environments/environment.interface';
import { environmentProd } from 'libs/xplat/core/src/lib/environments/base/environment.prod';
import {deepMerge} from '@tbs/utils';

export const overrides: Partial<IEnvironment> = {
  production: true,
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

export const environment = deepMerge(environmentProd, overrides);
