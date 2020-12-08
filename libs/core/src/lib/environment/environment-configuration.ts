import { IEnvironmentConfiguration } from './environment-configuration.interface';

export class EnvironmentConfiguration implements IEnvironmentConfiguration {
  production: boolean;
  apiKeys: { thegamesdb: string };
  firebase?: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    storageBucket: string;
  };
}
