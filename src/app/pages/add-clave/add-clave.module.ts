import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClavePageRoutingModule } from './add-clave-routing.module';

import { AddClavePage } from './add-clave.page';
import { SkeletonModule } from 'src/app/componentes/skeleton/skeleton.module';
import { ErrorFormModule } from 'src/app/componentes/error-form/error-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddClavePageRoutingModule,
    ReactiveFormsModule,
    SkeletonModule,
    ErrorFormModule,
  ],
  declarations: [AddClavePage]
})
export class AddClavePageModule {}
