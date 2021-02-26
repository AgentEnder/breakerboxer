import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptions, FIREBASE_OPTIONS } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';


import { AUTH_SERVICE } from '@tbs/user';

import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule,
        AngularFireAnalyticsModule,
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    exports: [],
    providers: [{
        provide: AUTH_SERVICE,
        useClass: AuthService
    }],
})
export class FirebaseModule {
    static forRoot(firebaseConfig: FirebaseOptions): ModuleWithProviders<FirebaseModule> {
        return ({
            ngModule: FirebaseModule,
            providers: [
                { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
            ]
        })
    }
}