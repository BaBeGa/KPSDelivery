import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'driverdialog/:id',
    loadChildren: './pages/driverdialog/driverdialog.module#DriverdialogPageModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'customeraccount', loadChildren: './pages/customeraccount/customeraccount.module#CustomeraccountPageModule' },
  { path: 'customeraddress', loadChildren: './pages/customeraddress/customeraddress.module#CustomeraddressPageModule' },
  { path: 'customeravatar', loadChildren: './pages/customeravatar/customeravatar.module#CustomeravatarPageModule' },
  { path: 'customerorder', loadChildren: './pages/customerorder/customerorder.module#CustomerorderPageModule' },
  { path: 'customerprofile', loadChildren: './pages/customerprofile/customerprofile.module#CustomerprofilePageModule' },
  { path: 'customertabs', loadChildren: './pages/customertabs/customertabs.module#CustomertabsPageModule' },
  ////{ path: 'driver', loadChildren: './pages/driver/driver.module#DriverPageModule' },
  { path: 'driverdialog', loadChildren: './pages/driverdialog/driverdialog.module#DriverdialogPageModule' },
  { path: 'driverregister', loadChildren: './pages/driverregister/driverregister.module#DriverregisterPageModule' },
  //{ path: 'food-add-remove', loadChildren: './pages/food-add-remove/food-add-remove.module#FoodAddRemovePageModule' },
  //// { path: 'foodcenter', loadChildren: './pages/foodcenter/foodcenter.module#FoodcenterPageModule' },
  { path: 'foodstore', loadChildren: './pages/foodstore/foodstore.module#FoodstorePageModule' },
  { path: 'helpcenter', loadChildren: './pages/helpcenter/helpcenter.module#HelpcenterPageModule' },
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' },
  { path: 'legalnterm', loadChildren: './pages/legalnterm/legalnterm.module#LegalntermPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'my-profile', loadChildren: './pages/my-profile/my-profile.module#MyProfilePageModule' },
  //// { path: 'my-wallet', loadChildren: './pages/my-wallet/my-wallet.module#MyWalletPageModule' },
  { path: 'ratedriver', loadChildren: './pages/ratedriver/ratedriver.module#RatedriverPageModule' },
  { path: 'raterestaurant', loadChildren: './pages/raterestaurant/raterestaurant.module#RaterestaurantPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'restaurants', loadChildren: './pages/restaurants/restaurants.module#RestaurantsPageModule' },
  { path: 'tabs-controller', loadChildren: './pages/tabs-controller/tabs-controller.module#TabsControllerPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'driverworkhistory', loadChildren: './pages/driverworkhistory/driverworkhistory.module#DriverworkhistoryPageModule' },
  { path: 'change-password', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
