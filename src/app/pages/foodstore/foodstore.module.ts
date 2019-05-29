import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoodstorePage } from './foodstore.page';

const routes: Routes = [
  { path: 'food-add-remove', loadChildren: '../food-add-remove/food-add-remove.module#FoodAddRemovePageModule' },
  {
    path: '',
    component: FoodstorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoodstorePage]
})
export class FoodstorePageModule {}
