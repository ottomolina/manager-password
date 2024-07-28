import { Injectable } from '@angular/core';
import { BIOMETRIC_ERRORS } from '@awesome-cordova-plugins/fingerprint-aio';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx/index';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {
  public isSupported: boolean;
  public isEnrolled: boolean;

  constructor(
    private finger: FingerprintAIO,
    private platform: Platform
  ) { }


  public verificarDisponibilidad() {
    return new Promise<any>(async(resolve, reject) => {
      this.platform.ready().then(async res => {
        if(this.platform.is('mobileweb')) {
          this.isSupported = true;
          this.isEnrolled = true;
          resolve(false);
          return;
        }
        try {
          const result = await this.finger.isAvailable();
          this.isSupported = true;
          this.isEnrolled = true;
          resolve(result);
        } catch(error: any) {
          console.error('error', error);
          this.isSupported = !(error.code == BIOMETRIC_ERRORS.BIOMETRIC_HARDWARE_NOT_SUPPORTED);
          this.isEnrolled = !(error.code == BIOMETRIC_ERRORS.BIOMETRIC_NOT_ENROLLED);
          resolve(false);
        }
      })
    });
  }

  public escanearBiometrico(descripcion: string): Promise<boolean> {
    return new Promise<any>(async(resolve, reject) => {
      if(this.platform.is('mobileweb')) {
        resolve(true);
        return;
      }
      this.finger.show({
        title: 'Escanear biométrico',
        description: descripcion,
        cancelButtonTitle: 'Cancelar',
        fallbackButtonTitle: 'Usar PIN',
      }).then(result => {
        console.log('result', result);
        resolve(true);
      }).catch(error => {
        console.error('Error', error);
        resolve(false);
      });
    });
  }

}
