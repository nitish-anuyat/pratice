import {Injectable} from '@angular/core';
import { BrowserService } from './browser.service';
import { Router } from '@angular/router';


class LocalStorage implements Storage {
  [name: string]: any;
  readonly length!: number;
  clear(): void {}
  getItem(key: string): string | null {return null;}
  key(index: number): string | null {return null;}
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

const TOKEN = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {

  private storage: Storage;

  constructor(private browserService : BrowserService, private _router : Router) {
    this.storage = new LocalStorage();

    browserService.getIsBrowser().subscribe(isBrowser => {
      if (isBrowser) {
        this.storage = localStorage;
      }
    });
  }

  [name: string]: any;

  length!: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }

  getToken() {
    return this.getItem(TOKEN);
  }

  setToken(token: string) {
    this.setItem(TOKEN, token);
  }

  removeToken() {
    this.removeItem(TOKEN);
    this._router.navigate(['/auth/signin']);
  }
}
