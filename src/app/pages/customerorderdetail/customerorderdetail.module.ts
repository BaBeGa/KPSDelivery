import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerorderdetailPage } from './customerorderdetail.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerorderdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerorderdetailPage]
})
export class CustomerorderdetailPageModule {}
