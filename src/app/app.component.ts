import { Component } from '@angular/core';
import { SecurityService } from './services/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private securityService: SecurityService
  ) {
    setTimeout(() => {
      this.securityService.init();
    }, 100);
  }
}
