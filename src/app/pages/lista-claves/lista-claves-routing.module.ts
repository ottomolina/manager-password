import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaClavesPage } from './lista-claves.page';

const routes: Routes = [
  {
    path: '',
    component: ListaClavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaClavesPageRoutingModule {}
