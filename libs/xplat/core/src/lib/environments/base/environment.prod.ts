import { IEnvironment } from '@tbs/xplat/core';
import { deepMerge } from '@tbs/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
