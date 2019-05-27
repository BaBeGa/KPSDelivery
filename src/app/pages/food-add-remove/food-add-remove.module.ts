import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoodAddRemovePage } from './food-add-remove.page';

const routes: Routes = [
  {
    path: '',
    component: FoodAddRemovePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoodAddRemovePage]
})
export class FoodAddRemovePageModule {}
