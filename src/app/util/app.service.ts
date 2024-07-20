import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, ToastButton, ToastController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public form: FormGroup;
  private isLoading = false;
  private showToast = false;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  public async loader(mensaje?: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: mensaje || 'Espera por favor.',
      spinner: 'dots'
    }).then(a => {
      a.present().then(() => {
        if(!this.isLoading) {
          a.dismiss().then(() => { });
        }
      });
    });
  }

  public async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => { }).catch(() => console.log('There is no loader active.') );
  }

  public async alert(mensaje: string, callback?: () => void, backdropDismiss = false) {
    const alert = await this.alertController.create({
      backdropDismiss,
      message: mensaje,
      buttons: [
        { text: 'Aceptar', handler: callback }
      ],
      mode: 'md'
    });
    await alert.present();
  }

  async confirmacion(mensaje: string, callback?: () => void, titulo: string = '') {
    let alert: HTMLIonAlertElement = await this.alertController.create({
      backdropDismiss: false,
      mode: 'md',
      header: titulo,
      message: mensaje,
    });
    if (callback) {
      alert.buttons = [
        { text: 'Sí', handler: callback },
        { text: 'No', role: 'cancel' },
      ];
    } else {
      alert.buttons = ['OK'];
    }
    await alert.present();
  }

  public async toast(message: string, button?: ToastButton, duration=4000) {
    if(this.showToast) {
      return;
    }
    this.showToast = true;
    const buttons = [];
    button? buttons.push(button) : null;
    const toast = await this.toastController.create({
      message,
      duration: duration,
      position: 'bottom',
      buttons
    });
    await toast.present();
    toast.onDidDismiss().then(() => {
      this.showToast = false;
    });
  }

  public async mostrarModal(component: ComponentRef, componentProps?: ComponentProps<ComponentRef>) {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component,
      componentProps,
    });
    await modal.present();
    return modal;
  }

  /**
   * Obtiene una descripción del error dentro del control del formulario
   * @param name: nombre del control del formulario
   * @param patron: (opcional) en caso de validar pattern indicar un texto de ejemplo que cumpla el patrón
   * @returns: string con el error del control del formulario
  */  
  public getErrorFormControl(name: string, patron?: string): string {
    const errors = this.form.controls[name].errors!;
    if(errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if(errors['minlength']) {
      const error = this.form.controls[name].errors?.['minlength'];
      return `El valor ingresado debe tener al menos ${error.requiredLength} caracteres.`;
    }
    if(errors['min']) {
      const error = this.form.controls[name].errors?.['min'];
      return `El valor mínimo de este campo es ${error.min}.`;
    }
    if(errors['max']) {
      const error = this.form.controls[name].errors?.['max'];
      return `El valor máximo de este campo es ${error.max}.`;
    }
    if(errors['maxlength']) {
      const error = this.form.controls[name].errors?.['maxlength'];
      return `El valor ingresado no debe tener más de ${error.requiredLength} caracteres.`;
    }
    if(errors['pattern']) {
      return `El valor ingresado es inválido${patron ? `, texto de ejemplo: ${patron}` : ''}`;
    }
    return '';
  }

  /**
   * Verifica si un control form contiene errores
   * @param name: nombre del control del formulario
   * @returns: boolean indicando si el control form contiene errores
   */
  public hasErrorFormControl(name: string): boolean {
    return this.form.controls[name].errors !== null;
  }

}
