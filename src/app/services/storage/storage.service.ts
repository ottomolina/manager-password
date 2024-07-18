import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CONSTANSTS from './storage.constants';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage;

  constructor(
    private storage: Storage,
    private router: Router,
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const login = sessionStorage.getItem(CONSTANSTS.LOGIN);
    if(login === null || login === undefined || login === '' || !login) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
}

  set login(login: boolean) {
    sessionStorage.setItem(CONSTANSTS.LOGIN, JSON.stringify(login));
  }

  get login() {
    const login = sessionStorage.getItem(CONSTANSTS.LOGIN);
    return Boolean(login);
  }

}
