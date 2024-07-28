import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SkeletonComponent
  ]
})
export class SkeletonModule { }
