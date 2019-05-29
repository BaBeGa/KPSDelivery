import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomertabsPage } from './customertabs.page';

const routes: Routes = [
  {
    path: 'ctabs',
    component: CustomertabsPage,
    children:[
      { path: 'customerprofile', loadChildren: '../customerprofile/customerprofile.module#CustomerprofilePageModule' },
      { path: 'customerorder', loadChildren: '../customerorder/customerorder.module#CustomerorderPageModule' },
      { path: 'foodcenter', loadChildren: '../foodcenter/foodcenter.module#FoodcenterPageModule' },
      { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'ctabs/foodcenter',
    pathMatch:'full'
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
  declarations: [CustomertabsPage]
})
export class CustomertabsPageModule {}
