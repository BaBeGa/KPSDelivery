import { NgModule } from '@angular/core';//
import { BrowserModule } from '@angular/platform-browser';//
import { RouteReuseStrategy } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';//
import { StatusBar } from '@ionic-native/status-bar/ngx';//

import { AppComponent } from './app.component';//
import { AppRoutingModule } from './app-routing.module';//

//new
//---Plugin---//
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';

//---Service---//
import { CheckPasswordDirective } from 'src/app/config/validators';
import { AuthService, CartService } from 'src/app/config/authservice';

//---Firebase---//
import { FirebaseMessaging } from "@ionic-native/firebase-messaging/ngx";
import { DriverdialogPage } from 'src/app/pages/driverdialog/driverdialog.page';

//---Customer---//
import { BasketPage } from 'src/app/pages/basket/basket.page';
import { CustomeraccountPage } from 'src/app/pages/customeraccount/customeraccount.page';
import { CustomeraddressPage } from 'src/app/pages/customeraddress/customeraddress.page';
import { CustomeravatarPage } from 'src/app/pages/customeravatar/customeravatar.page';
import { CustomerorderPage } from 'src/app/pages/customerorder/customerorder.page';
import { CustomerprofilePage } from 'src/app/pages/customerprofile/customerprofile.page';
import { CustomertabsPage } from 'src/app/pages/customertabs/customertabs.page';
import { DriverregisterPage } from 'src/app/pages/driverregister/driverregister.page';
import { EditProfileAddressPage } from 'src/app/pages/edit-profile-address/edit-profile-address.page';
import { EditProfileNamePage } from 'src/app/pages/edit-profile-name/edit-profile-name.page';
import { EditProfilePasswordPage } from 'src/app/pages/edit-profile-password/edit-profile-password.page';
import { FoodAddRemovePage } from 'src/app/pages/food-add-remove/food-add-remove.page';
import { FoodcenterPage } from 'src/app/pages/foodcenter/foodcenter.page';
import { FoodstorePage } from 'src/app/pages/foodstore/foodstore.page';
import { ForgotpasswordPage } from 'src/app/pages/forgotpassword/forgotpassword.page';
import { HelpcenterPage } from 'src/app/pages/helpcenter/helpcenter.page';
import { HistoryPage } from 'src/app/pages/history/history.page';
import { HistoryDetailPage } from 'src/app/pages/history-detail/history-detail.page';
import { LegalntermPage } from 'src/app/pages/legalnterm/legalnterm.page';
import { LoginPage } from 'src/app/pages/login/login.page';
import { MainPage } from 'src/app/pages/main/main.page';
import { MenuPage } from 'src/app/pages/menu/menu.page';
import { RatedriverPage } from 'src/app/pages/ratedriver/ratedriver.page';
import { RaterestaurantPage } from 'src/app/pages/raterestaurant/raterestaurant.page';
import { RegisterPage } from 'src/app/pages/register/register.page';
//

@NgModule({
  declarations: [
    AppComponent,
    BasketPage,
    CustomeraccountPage,
    CustomeraddressPage,
    CustomeravatarPage,
    CustomerorderPage,
    CustomerprofilePage,
    CustomertabsPage,
    DriverregisterPage,
    EditProfileAddressPage,
    EditProfileNamePage,
    EditProfilePasswordPage,
    FoodAddRemovePage,
    FoodcenterPage,
    FoodstorePage,
    ForgotpasswordPage,
    HelpcenterPage,
    HistoryPage,
    HistoryDetailPage,
    LegalntermPage,
    LoginPage,
    MainPage,
    MenuPage,
    RatedriverPage,
    RaterestaurantPage,
    RegisterPage,
    CheckPasswordDirective,
  ],
  entryComponents: [
    AppComponent,
    BasketPage,
    CustomeraccountPage,
    CustomeraddressPage,
    CustomeravatarPage,
    CustomerorderPage,
    CustomerprofilePage,
    CustomertabsPage,
    DriverregisterPage,
    EditProfileAddressPage,
    EditProfileNamePage,
    EditProfilePasswordPage,
    FoodAddRemovePage,
    FoodcenterPage,
    FoodstorePage,
    ForgotpasswordPage,
    HelpcenterPage,
    HistoryPage,
    HistoryDetailPage,
    LegalntermPage,
    LoginPage,
    MainPage,
    MenuPage,
    RatedriverPage,
    RaterestaurantPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    FirebaseMessaging,
    Toast,
    AuthService,
    CartService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
