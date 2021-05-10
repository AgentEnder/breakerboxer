import { Observable } from 'rxjs';

import { User } from './user.interface';

export interface IAuthService {
  signIn$: () => Observable<User>;
  signOut$: () => Observable<void>;
}
