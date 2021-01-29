import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlatformGroup } from '../models';
import { RAWG } from '../models';
import { hostOptions, platformOptions } from './static-data';

const baseUrl = 'https://api.rawg.io/api';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  constructor(private httpClient: HttpClient) {}

  getEmulationHosts(): Observable<PlatformGroup[]> {
    return of(hostOptions);
  }

  getPlatforms(): Observable<PlatformGroup[]> {
    return of(platformOptions);
  }

  getRealPlatforms(search): Observable<RAWG.Platform[]> {
    return this.httpClient
      .get<RAWG.PagedReturn<RAWG.Platform>>(baseUrl + '/platforms', {
        params: { search },
      })
      .pipe(map((x) => x.results));
  }

  searchGames(search: string): Observable<RAWG.Game[]> {
    return this.httpClient
      .get<RAWG.PagedReturn<RAWG.Game>>(baseUrl + '/games', {
        params: { search },
      })
      .pipe(
        map((x) => {
          console.log('X', x);
          return x && x.results;
        })
      );
  }
}
