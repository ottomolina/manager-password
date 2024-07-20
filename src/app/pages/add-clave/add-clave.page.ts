import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClaveModel } from 'src/app/models/clave.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AppService } from 'src/app/util/app.service';
import { NavigationService } from 'src/app/util/navigation.service';

@Component({
  selector: 'app-add-clave',
  templateUrl: './add-clave.page.html',
  styleUrls: ['./add-clave.page.scss'],
})
export class AddClavePage implements OnInit {
  public cargando: boolean = true;
  public submitted: boolean;

  constructor(
    public app: AppService,
    private nav: NavigationService,
    private formBuilder: FormBuilder,
    private storage: StorageService,
  ) {
    this.app.form = this.formBuilder.group({
      sitio: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      usuario: ['', [Validators.required]],
      offset: ['', [Validators.required]],
      otro: [false],
    });
    this.cargando = false;
  }

  ngOnInit() {
  }

  public regresar() {
    this.nav.back();
  }

  private obtenerItem() {
    if(!this.app.form.valid) {
      return undefined;
    }

    const { sitio, usuario, offset: clave } = this.app.form.value;
    const item: ClaveModel = { sitio, usuario, clave };
    return item;
  }

  public async guardar() {
    this.submitted = true;
    const item = this.obtenerItem();
    if(!item) {
      return;
    }
    try {
      await this.app.loader();
      await this.storage.agregarClave(item);

      await this.app.toast('¡Registro guardado!');
      if(!this.app.form.value.otro) {
        setTimeout(() => this.nav.back({ actualizar: true }), 100);
      } else {
        this.limpiar();
      }
    } catch(err: any) {
      console.log('error', err);
      this.app.alert('Ocurrió un error al guardar el registro.');
    } finally {
      await this.app.dismissLoader();
    }
  }

  private limpiar() {
    this.submitted = false;
    this.app.form.reset();
  }

}
