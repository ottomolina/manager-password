import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastButton, ToastController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class AppService {
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

}
