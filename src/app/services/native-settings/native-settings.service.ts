import { Injectable } from '@angular/core';
import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';

@Injectable({
  providedIn: 'root'
})
export class NativeSettingsService {

  constructor() { }

  public openSettings() {
    NativeSettings.open({
      optionAndroid: AndroidSettings.Security,
      optionIOS: IOSSettings.TouchIdPasscode
    }).then(resp => console.log('resp', resp)
    ).catch(err => console.log('error nativesettings', err));
  }
}
