import { NgModule } from '@angular/core';//
import { BrowserModule } from '@angular/platform-browser';//
import { RouteReuseStrategy } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { DatePipe } from "@angular/common";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';//
import { StatusBar } from '@ionic-native/status-bar/ngx';//

import { AppComponent } from './app.component';//
import { AppRoutingModule } from './app-routing.module';//
//new
//---Plugin---//
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from "@ionic-native/http/ngx";

//---Service---//
import { CheckPasswordDirective } from 'src/app/config/validators';
import { AuthService } from 'src/app/config/authservice';

//---Firebase---//
import { FirebaseMessaging } from "@ionic-native/firebase-messaging/ngx";

//---Customer---//
import { CustomeraddressPage } from 'src/app/pages/customeraddress/customeraddress.page';
import { CustomeravatarPage } from 'src/app/pages/customeravatar/customeravatar.page';
import { DriverregisterPage } from 'src/app/pages/driverregister/driverregister.page';
import { FoodAddRemovePage } from 'src/app/pages/food-add-remove/food-add-remove.page';
import { HelpcenterPage } from 'src/app/pages/helpcenter/helpcenter.page';
import { HistoryDetailPage } from 'src/app/pages/history-detail/history-detail.page';
import { LegalntermPage } from 'src/app/pages/legalnterm/legalnterm.page';
import { MainPage } from 'src/app/pages/main/main.page';

@NgModule({
  declarations: [
    AppComponent,
    CustomeraddressPage,
    CustomeravatarPage,
    DriverregisterPage,
    FoodAddRemovePage,
    HelpcenterPage,
    HistoryDetailPage,
    LegalntermPage,
    MainPage,
    CheckPasswordDirective
  ],
  entryComponents: [
    AppComponent,
    CustomeraddressPage,
    CustomeravatarPage,
    DriverregisterPage,
    FoodAddRemovePage,
    HelpcenterPage,
    HistoryDetailPage,
    LegalntermPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    Camera,
    DatePipe,
    StatusBar,
    SplashScreen,
    Geolocation,
    FirebaseMessaging,
    Toast,
    AuthService,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
