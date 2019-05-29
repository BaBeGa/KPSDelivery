import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoodcenterPage } from './foodcenter.page';

const routes: Routes = [
  { path: 'foodstore', loadChildren: '../foodstore/foodstore.module#FoodstorePageModule' },
  { path: 'basket', loadChildren: '../basket/basket.module#BasketPageModule' },
  {
    path: '',
    component: FoodcenterPage
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
  declarations: [FoodcenterPage]
})
export class FoodcenterPageModule {}
