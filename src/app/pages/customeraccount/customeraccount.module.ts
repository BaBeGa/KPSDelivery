import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomeraccountPage } from './customeraccount.page';

const routes: Routes = [
  { path: 'edit-profile-address', loadChildren: '../edit-profile-address/edit-profile-address.module#EditProfileAddressPageModule' },
  { path: 'edit-profile-name', loadChildren: '../edit-profile-name/edit-profile-name.module#EditProfileNamePageModule' },
  { path: 'edit-profile-password', loadChildren: '../edit-profile-password/edit-profile-password.module#EditProfilePasswordPageModule' },
  {
    path: '',
    component: CustomeraccountPage
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
  declarations: [CustomeraccountPage]
})
export class CustomeraccountPageModule {}
