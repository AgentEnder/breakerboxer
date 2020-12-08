import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformGroup } from '../models';
import { hostOptions, platformOptions } from './static-data';

@Injectable()
export class GameDataService {
  constructor(private httpClient: HttpClient) {}

  getEmulationHosts(): Observable<PlatformGroup[]> {
    return of(hostOptions);
  }

  getPlatforms(): Observable<PlatformGroup[]> {
    this.httpClient.get('/v1/Platforms').subscribe(x => console.table(x));
    return of(platformOptions);
  }
}
