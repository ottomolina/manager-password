import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFormComponent } from './error-form.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ErrorFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ErrorFormComponent
  ],
})
export class ErrorFormModule { }
