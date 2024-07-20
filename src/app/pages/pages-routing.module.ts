import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      { path: '', redirectTo: 'lista-claves', pathMatch: 'prefix' },
      { path: 'lista-claves', loadChildren: () => import('./lista-claves/lista-claves.module').then( m => m.ListaClavesPageModule) },
      { path: 'add-clave', loadChildren: () => import('./add-clave/add-clave.module').then( m => m.AddClavePageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
