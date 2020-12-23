import {baseEnvironment, IEnvironmentConfiguration} from '@tbs/core';
import {deepMerge} from '@tbs/utils';

export const overrides: Partial<IEnvironmentConfiguration> = {
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

export const environment = deepMerge(baseEnvironment, overrides);
