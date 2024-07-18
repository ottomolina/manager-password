import { Component, OnInit } from '@angular/core';
import { FingerprintService } from '../services/fingerprint/fingerprint.service';
import { NativeSettingsService } from '../services/native-settings/native-settings.service';
import { AppService } from '../util/app.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import * as CONST_FINGER from '../services/fingerprint/fingerprint.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public deshabilitar: boolean;

  constructor(
    public fingerprintService: FingerprintService,
    private nativeSettingsService: NativeSettingsService,
    private app: AppService,
    private storage: StorageService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.fingerprintService.verificarDisponibilidad();
    this.verificarEnrolamiento();
  }
  
  private verificarEnrolamiento() {
    if(this.fingerprintService.isSupported && !this.fingerprintService.isEnrolled) {
      this.app.confirmacion('No tienes configurada tu seguridad biométrica en el dispositivo, te gustaría configurarla ahora?', () => {
        this.nativeSettingsService.openSettings();
      });
    }
  }

  async clickHuella() {
    if(!this.fingerprintService.isSupported) {
      this.app.alert('Tu dispositivo no es compatible con esta aplicación.');
      return;
    }
    if(this.fingerprintService.isSupported && !this.fingerprintService.isEnrolled) {
      this.app.confirmacion('Debes configurar tu seguridad biométrica en el dispositivo para acceder a esta aplicación, te gustaría configurarla ahora?', () => {
        this.nativeSettingsService.openSettings();
      });
      return;
    }
    try {
      const result = await this.fingerprintService.escanearBiometrico(CONST_FINGER.DESCRIPCION_ESCANEO);
      if(result) {
        await this.app.loader('Espera un momento, ingresando.');
        this.storage.login = true;
        setTimeout(() => {
          this.app.dismissLoader();
          this.app.toast('Autenticación exitosa!', undefined, 1000);
        }, 1500);
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }
    } catch(error) {
      console.error('error', error);
      this.app.alert('Ocurrió un inconveniente mientras te autenticabas, reintenta en un momento.')
    }
  }

}
