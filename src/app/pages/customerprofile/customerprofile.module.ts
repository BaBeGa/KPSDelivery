import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerprofilePage } from './customerprofile.page';

const routes: Routes = [
  { path: 'basket', loadChildren: '../basket/basket.module#BasketPageModule' },
  { path: 'customeraccount', loadChildren: '../customeraccount/customeraccount.module#CustomeraccountPageModule' },
  { path: 'customeraddress', loadChildren: '../customeraddress/customeraddress.module#CustomeraddressPageModule' },
  { path: 'customeravatar', loadChildren: '../customeravatar/customeravatar.module#CustomeravatarPageModule' },
  { path: 'customerorder', loadChildren: '../customerorder/customerorder.module#CustomerorderPageModule' },
  { path: 'helpcenter', loadChildren: '../helpcenter/helpcenter.module#HelpcenterPageModule' },
  { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
  { path: 'legalnterm', loadChildren: '../legalnterm/legalnterm.module#LegalntermPageModule' },
  { path: 'login', loadChildren: '../login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
  { path: 'ratedriver', loadChildren: '../ratedriver/ratedriver.module#RatedriverPageModule' },
  { path: 'raterestaurant', loadChildren: '../raterestaurant/raterestaurant.module#RaterestaurantPageModule' },
  { path: 'register', loadChildren: '../register/register.module#RegisterPageModule' },
  {
    path: '',
    component: CustomerprofilePage
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
  declarations: [CustomerprofilePage]
})
export class CustomerprofilePageModule {}
