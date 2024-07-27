import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AppService } from 'src/app/util/app.service';
import { ClaveModel } from 'src/app/models/clave.model';
import { NavigationService } from 'src/app/util/navigation.service';

@Component({
  selector: 'app-lista-claves',
  templateUrl: './lista-claves.page.html',
  styleUrls: ['./lista-claves.page.scss'],
})
export class ListaClavesPage implements OnInit {
  public lista: Array<ClaveModel> = [];

  constructor(
    private app: AppService,
    private storage: StorageService,
    private nav: NavigationService,
  ) { }

  async ngOnInit() {
    try {
      await this.app.loader();
      this.storage.obtenerClaves().then(result => {
        this.app.dismissLoader();
        this.lista = result;
      });
    } catch(error) {
      this.app.dismissLoader();
      console.error('error', error);
    }
  }

  ionViewDidEnter() {
    if(this.nav.data?.actualizar) {
      this.nav.data = null;
      this.ngOnInit();
    }
  }

  public agregarClave() {
    this.nav.navigateForward('add-clave');
  }

  public editarClave({id}: ClaveModel) {
    this.nav.navigateForward(`add-clave/${id}`);
  }

  public eliminar(item: ClaveModel) {
    this.app.confirmacion('Se eliminará el registro de esta contraseña. ¿Estás seguro de realizar esta acción?', () => {
      this.procesoEliminar(item);
    });
  }

  private async procesoEliminar(item: ClaveModel) {
    try {
      await this.app.loader();
      await this.storage.eliminarClave(item);
      this.app.toast(`Registro eliminado exitosamente!`, undefined, 2000);
      this.ngOnInit();
    } catch(error) {
      console.error('error', error);
      this.app.alert('Ocurrió un error al realizar esta acción, inténtalo más tarde.')
    } finally {
      await this.app.dismissLoader();
    }
  }

}
