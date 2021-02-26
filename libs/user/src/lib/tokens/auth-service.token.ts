import { InjectionToken } from '@angular/core';

import { IAuthService } from '../models';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE_TOKEN');
