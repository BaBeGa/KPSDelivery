import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DriverworkhistoryPage } from './driverworkhistory.page';

const routes: Routes = [
  {
    path: '',
    component: DriverworkhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DriverworkhistoryPage]
})
export class DriverworkhistoryPageModule {}
