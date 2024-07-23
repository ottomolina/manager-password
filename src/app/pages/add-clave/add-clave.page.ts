import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public clave: ClaveModel | undefined;
  public titulo: string = 'Nueva contraseña';
  public showPassword: boolean;

  constructor(
    public app: AppService,
    private nav: NavigationService,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private route: ActivatedRoute,
  ) {
    this.init();
  }
  
  public async init() {
    this.route.params.subscribe(async param => {
      if(param['id']) {
        this.clave = await this.storage.obtenerClave(param['id']);
        this.titulo = 'Editar contraseña'
      }
      this.app.form = this.formBuilder.group({
        sitio: [this.clave ? this.clave.sitio : '', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
        usuario: [this.clave ? this.clave.usuario : '', [Validators.required]],
        offset: [this.clave ? this.clave.clave : '', [Validators.required]],
        otro: [false],
      });
      this.clave && this.app.form.get('sitio')?.disable({emitEvent: false});
      this.cargando = false;
    });
  }

  ngOnInit() {
  }

  public regresar() {
    this.nav.back();
  }

  private obtenerItem() {
    const { sitio, usuario, offset: clave } = this.app.form.value;
    if(this.clave && (
      this.clave.sitio === sitio.trim() &&
      this.clave.usuario === usuario.trim() &&
      this.clave.clave === clave.trim()
    )) {
      this.app.toast('Aún no has realizado ningún cambio en el registro.');
      return undefined;
    } else if(!this.app.form.valid) {
      return undefined;
    }
    const item: ClaveModel = { sitio: sitio.trim(), usuario: usuario.trim(), clave: clave.trim() };
    if(this.clave) {
      item.id = this.clave.id;
    }
    return item;
  }

  private async verificarSiExiste(item: ClaveModel) {
    const lista = await this.storage.obtenerClaves();
    let index = -1;
    if(this.clave) {
      index = lista.findIndex(e => e.sitio === item.sitio && e.id !== item.id);
    } else {
      index = lista.findIndex(e => e.sitio === item.sitio);
    }
    return index > -1;
  }

  public async guardar() {
    this.submitted = true;
    const item = this.obtenerItem();
    if(!item) {
      return;
    }
    const existe = await this.verificarSiExiste(item);
    if(existe) {
      const lista = await this.storage.obtenerClaves();
      this.app.confirmacion('Ya existe una contraseña para el sitio que ingresaste. ¿Te gustaría actualizarla?', () => {
        const itemAux = lista.find(e => e.sitio === item.sitio);
        item.id = itemAux?.id;
        this.procesoGuardar(item);
      });
    } else {
      this.procesoGuardar(item);
    }
  }

  private async procesoGuardar(item: ClaveModel) {
    try {
      await this.app.loader();
      !item.id && await this.storage.agregarClave(item);
      item.id && await this.storage.actualizarClave(item);

      await this.app.toast('¡Registro guardado!');
      if(!this.app.form.value.otro) {
        setTimeout(() => this.nav.back({ actualizar: true }), 100);
      } else {
        this.limpiar();
      }
    } catch(err: any) {
      console.error('error', err);
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
