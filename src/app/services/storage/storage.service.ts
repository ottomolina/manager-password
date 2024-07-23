import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CONSTANTS from './storage.constants';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ClaveModel } from 'src/app/models/clave.model';

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
    const login = sessionStorage.getItem(CONSTANTS.LOGIN);
    if(login === null || login === undefined || login === '' || !login) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
}

  set login(login: boolean) {
    sessionStorage.setItem(CONSTANTS.LOGIN, JSON.stringify(login));
  }

  get login() {
    const login = sessionStorage.getItem(CONSTANTS.LOGIN);
    return Boolean(login);
  }

  public async agregarClave(clave: ClaveModel) {
    let lista: Array<ClaveModel> = await this.obtenerClaves();
    clave.id = (lista.length + 1);
    lista = [ ...lista, clave ];
    await this._storage.set(CONSTANTS.LISTA, lista);
  }

  public async obtenerClaves(): Promise<Array<ClaveModel>> {
    const item: Array<ClaveModel> = await this._storage.get(CONSTANTS.LISTA);
    return item ? item : [];
  };

  public async obtenerClave(id: number): Promise<ClaveModel | undefined> {
    const lista: Array<ClaveModel> = await this.obtenerClaves();
    const item = lista.find(item => item.id == id);
    return item;
  }

  public async actualizarClave(clave: ClaveModel) {
    const items: Array<ClaveModel> = await this.obtenerClaves();
    const index = items.findIndex(e => e.id == clave.id);
    const lista = [
        ...items.slice(0, index),
        clave,
        ...items.slice(index+1)
    ];
    await this._storage.set(CONSTANTS.LISTA, lista);
}

}
