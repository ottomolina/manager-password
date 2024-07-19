import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaClavesPageRoutingModule } from './lista-claves-routing.module';

import { ListaClavesPage } from './lista-claves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaClavesPageRoutingModule
  ],
  declarations: [ListaClavesPage]
})
export class ListaClavesPageModule {}
