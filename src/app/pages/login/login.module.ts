import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  { path: 'customertabs', loadChildren: '../customertabs/customertabs.module#CustomertabsPageModule' },
  { path: 'register', loadChildren: '../register/register.module#RegisterPageModule' },
  { path: 'forgotpassword', loadChildren: '../forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
  {
    path: '',
    component: LoginPage
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
  declarations: [LoginPage]
})
export class LoginPageModule {}
