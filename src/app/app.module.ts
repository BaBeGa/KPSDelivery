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
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from "@ionic-native/http/ngx";
import { IonicStorageModule } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


//---Service---//
import { CheckPasswordDirective } from 'src/app/config/validators';
import { AuthService } from 'src/app/config/authservice';

//---Firebase---//
import { FirebaseMessaging } from "@ionic-native/firebase-messaging/ngx";

//---Customer---//
import { FoodAddRemovePage } from 'src/app/pages/food-add-remove/food-add-remove.page';

@NgModule({
  declarations: [
    AppComponent,
    FoodAddRemovePage,
    CheckPasswordDirective
  ],
  entryComponents: [
    AppComponent,
    FoodAddRemovePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    Camera,
    DatePipe,
    StatusBar,
    SplashScreen,
    Geolocation,
    LaunchNavigator,
    FirebaseMessaging,
    Toast,
    AuthService,
    File,
    WebView,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
