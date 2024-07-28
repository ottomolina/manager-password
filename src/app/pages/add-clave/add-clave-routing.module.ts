import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClavePage } from './add-clave.page';

const routes: Routes = [
  {
    path: '',
    component: AddClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClavePageRoutingModule {}
