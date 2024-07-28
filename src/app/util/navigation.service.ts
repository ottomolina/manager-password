import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
    public data: any;

    constructor(
        private nav: NavController
    ) { }

    public navigateForward(url: string, data?: any) {
        this.data = data;
        this.nav.navigateForward(url);
    }
    
    public navigateBack(url: string, data?: any) {
        this.data = data;
        this.nav.navigateBack(url);
    }
    
    public navigateRoot(url: string, data?: any) {
        this.data = data;
        this.nav.navigateRoot(url);
    }
    
    public back(data?: any) {
        this.data = data;
        this.nav.back();
    }

}