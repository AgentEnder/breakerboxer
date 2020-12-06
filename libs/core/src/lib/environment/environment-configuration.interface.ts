export type IEnvironmentConfiguration = IGenericEnvironmentConfig & IAppSpecificEnvironmentConfig;

export interface IGenericEnvironmentConfig {
  production: boolean;
}

export interface IAppSpecificEnvironmentConfig {
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
