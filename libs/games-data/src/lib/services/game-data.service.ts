// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformGroup } from '../models';
import { hostOptions, platformOptions } from './static-data';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
//   constructor(httpClient: HttpClient) {}

    getEmulationHosts(): Observable<PlatformGroup[]> {
        return of(hostOptions);
    }

    getPlatforms(): Observable<PlatformGroup[]> {
        return of(platformOptions);
    }
}
