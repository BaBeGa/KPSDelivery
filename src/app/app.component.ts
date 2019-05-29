import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MenuPage } from 'src/app/pages/menu/menu.page';
import { Platform,AlertController,ToastController,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


//get the user id from auth
import { AuthService, User } from 'src/app/config/authservice';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(NavController) navCtrl: NavController;
    rootPage:any;
    user = {} as User;
    userInfo: any;
    userType: any;
  constructor(
    private router:Router,
    private dataService: DataService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController, 
    private userService: AuthService,
    public toastController: ToastController,
    private firebase:FirebaseMessaging
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.setupFCM();
    });
  }

  setupFCM(){
    //chech platform
    if (this.platform.is('android')) {
      //get token from firebase
      this.firebase.getToken().then(token=> {
        console.log("FCM_Token android: "+token);
        this.initializeUser();
      }).catch(err=> console.log(err));

      this.firebase.onMessage().subscribe(payload=>{
        console.log("New foreground FCM message: ", payload.orderid);
        this.presentAlertConfirm(payload)
      }),err=> console.log(err);
      this.firebase.onBackgroundMessage().subscribe(payload=>{
        console.log("New background FCM message: ", payload.orderid);
        this.presentAlertConfirm(payload)
      }),err=> console.log(err);

    } 
  
    if (this.platform.is('ios')) {
      this.firebase.requestPermission().then(()=>{
        console.log("Push messaging is allowed");
      })  

      //get token from firebase
      this.firebase.getToken().then(token=> {
        console.log("FCM_Token ios: "+token);
        this.initializeUser();
      }).catch(err=> console.log(err));
      
      this.firebase.onMessage().subscribe(payload=>{
        console.log("New foreground FCM message: ", payload.orderid);
        this.presentAlertConfirm(payload)
      }),err=> console.log(err);
      this.firebase.onBackgroundMessage().subscribe(payload=>{
        console.log("New background FCM message: ", payload.orderid);
        this.presentAlertConfirm(payload)
      }),err=> console.log(err);
      
    }
  }

  async initializeUser(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(this.userInfo!=null){
        await this.syncUserType();
        //this.saveTokenToBackend(localStorage.getItem('FCMToken'));   change to foodcenterpage,and driverpage
        this.userType = JSON.parse(localStorage.getItem('userType'));
        if(this.userType!= null){
          this.setRootPage();
        }else{
          console.log('UserType == null.')
        }
      }else{
        console.log('UserInfo == null.');
        this.router.navigateByUrl('customertabs');
      }
  }

  setRootPage(){
    console.log('set root page : '+this.userType);
    if(this.userType == null) {
      this.router.navigateByUrl('customertabs');
    }
    else if(this.userType == 'driver') {
      this.router.navigateByUrl('tabs-controller');
    }
    else if(this.userType == 'user') {
      this.router.navigateByUrl('customertabs');
    }
    else {
      this.router.navigateByUrl('customertabs');
    }
  }
  async syncUserType(){
    //this will update User Type when restart app, incase the User Type changed.
    await this.userService.apiSyncUserType();
  }

  async presentAlertConfirm(message:any) {
    const alert = await this.alertCtrl.create({
      header: message.title,
      message: message.body,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay',message);
            this.dataService.setData(message.orderid, message);
            this.router.navigateByUrl('driverdialog/'+message.orderid);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  
}

