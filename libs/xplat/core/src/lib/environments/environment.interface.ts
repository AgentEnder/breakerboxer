/**
 * Workspace shared environment properties
 */
export interface IEnvironment {
  production?: boolean;
  apiKeys?: {
    thegamesdb?: string;
    rawg?: string;
  };
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
