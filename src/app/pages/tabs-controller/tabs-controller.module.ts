import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsControllerPage } from './tabs-controller.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsControllerPage,
    children:[
      { path: 'driver', loadChildren: '../driver/driver.module#DriverPageModule' },
      { path: 'my-wallet', loadChildren: '../my-wallet/my-wallet.module#MyWalletPageModule' },
      { path: 'restaurants', loadChildren: '../restaurants/restaurants.module#RestaurantsPageModule' },
      { path: 'my-profile', loadChildren: '../my-profile/my-profile.module#MyProfilePageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'tabs/driver',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsControllerPage]
})
export class TabsControllerPageModule {}
