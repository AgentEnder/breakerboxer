import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setLocalStorage$(key: string, value: any): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        try {
          this.setLocalStorage(key, value);
          resolve();
        } catch {
          reject();
        }
      })
    );
  }

  retrieveLocalStorage<type>(key: string): type {
    return JSON.parse(localStorage.getItem(key)) as type;
  }
}
