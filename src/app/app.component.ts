import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { DataService } from 'src/app/services/data.service';
import { Platform,AlertController,ToastController,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DriverService } from "src/app/services/driver.service";
//get the user id from auth
import { AuthService, User } from 'src/app/config/authservice';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    lat:any ;
    lon:any ;
  constructor(
    private router:Router,
    private driverService: DriverService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController, 
    private userService: AuthService,
    private firebase:FirebaseMessaging,
    private geolocation:Geolocation,
    private toastCtrl:ToastController
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
      this.getGeolocation();
    });
  }

  setupFCM(){
    //chech platform
    if (this.platform.is('android')) {
      //get token from firebase
      this.firebase.getToken().then(async token=> {
        console.log("FCM_Token android: "+token);
        localStorage.setItem('FCMToken',JSON.stringify(token));
        await this.initializeUser();
        //await this.saveTokenToBackend(token);
      }).catch(err=> console.log(err));

      this.firebase.onMessage().subscribe(payload=>{
        console.log("New foreground FCM message: ", payload);
        //this.dataService.setData(payload.orderid, payload);
        if(payload.messageType == 'acception'){
          this.driverAlertConfirm(payload);
        }else if(payload.messageType == 'limit'){
          this.customerAlertConfirm(payload);
        }else if(payload.messageType == 'accepted'){
          this.customerAlert(payload);
        }
        
      }),err=> console.log(err);
      this.firebase.onBackgroundMessage().subscribe(payload=>{
        console.log("New background FCM message: ", payload);
        if(payload.messageType == 'acception'){
          this.driverAlertConfirm(payload);
        }else if(payload.messageType == 'limit'){
          this.customerAlertConfirm(payload);
        }else if(payload.messageType == 'accepted'){
          this.customerAlert(payload);
        }

      }),err=> console.log(err);

    } 
  
    if (this.platform.is('ios')) {
      this.firebase.requestPermission().then(()=>{
        console.log("Push messaging is allowed");
      })  

      //get token from firebase
      this.firebase.getToken().then(async token=> {
        console.log("FCM_Token ios: "+token);
        localStorage.setItem('FCMToken',JSON.stringify(token));
        await this.initializeUser();
        //await this.saveTokenToBackend(token);
      }).catch(err=> console.log(err));
      
      this.firebase.onMessage().subscribe(payload=>{
        console.log("New foreground FCM message: ", payload);
        if(payload.messageType == 'acception'){
          this.driverAlertConfirm(payload);
        }else if(payload.messageType == 'limit'){
          this.customerAlertConfirm(payload);
        }else if(payload.messageType == 'accepted'){
          this.customerAlert(payload);
        }
        this.driverAlertConfirm(payload)
      }),err=> console.log(err);
      this.firebase.onBackgroundMessage().subscribe(payload=>{
        console.log("New background FCM message: ", payload);

        if(payload.messageType == 'acception'){
          this.driverAlertConfirm(payload);
        }else if(payload.messageType == 'limit'){
          this.customerAlertConfirm(payload);
        }else if(payload.messageType == 'accepted'){
          this.customerAlert(payload);
        }
      }),err=> console.log(err);
      
    }
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp)=>{  
      this.lat=resp.coords.latitude
      this.lon=resp.coords.longitude      
    }).catch((error)=>{console.log('Error getting location',error);
    });
  }

  async saveTokenToBackend(token) {
    if(this.userInfo != null){
      let userID = this.userInfo.user.id;
    //console.log(userID);
    let body = { 
      id: userID,
      fcmToken: token
    }
    //console.log(body);
    await this.userService.apiPatchUpdateUser(body).then((result)=>{
      console.log('Save FCM_token status : ', result);
      return result;
    }).catch(err => console.log(err));
    }
  }

  async initializeUser(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(this.userInfo!=null){
        await this.syncUserType();
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
    else if(this.userType == 'customer') {
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

  async driverAlertConfirm(message:any) {
    let msg = 'ร้าน :'+message.resName+'<br/>'+'ส่ง :'+message.cusName
    const alert = await this.alertCtrl.create({
      header: message.title,
      message: msg,
      buttons: [
        {
          text: 'รับออเดอร์',
          handler: async () => {
            console.log('Confirm Okay',message);
            let body1 = {
              orderId:JSON.parse(message.orderid),
              userId:this.userInfo.user.id
            }
            this.userService.apiDriverAccept(body1).then(async ()=>{
              let body2 = {
                status:'assigned',
                _method: 'put',
                driver_lat_value: this.lat,
                driver_lon_value: this.lon,
                driver_id: this.userInfo.user.id
              }
              await this.userService.apiDriverOrder(message.orderid,body2);
              await this.driverService.setOrder(message);  
            }).then(()=>this.router.navigateByUrl('driverdialog'))
          }
        },{
          text: 'เพิกเฉย',
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

  async customerAlertConfirm(message:any) {
    const alert = await this.alertCtrl.create({
      header: 'ไม่พบคนขับ',
      message: 'เพิ่มระยะทางการค้นหา:',
      inputs: [{
        name: 'limit',
        type: 'number',
        placeholder: 'ใส่ระยะการค้นหา(กิโลเมตร)',
        min: 1,
        max: 20
      }],
      buttons: [
        {
          text: 'สั่งชื้ออีกครั้ง',
          handler: async (data) => {
            console.log('Confirm Okay',message);
            console.log('Confirm Okay',data.limit);
            try{
              if(data.limit > 0 && data.limit <20){
                this.userService.apiGetFinddriver(message.orderid,data.limit*1000);
              }else if(data.limit <= 0){
                const toast = await this.toastCtrl.create({
                  showCloseButton: true,
                  message: 'โปรดกรอกระยะทางการค้นหาอีกครั้ง',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              }else if(data.limt > 20){
                const toast = await this.toastCtrl.create({
                  showCloseButton: true,
                  message: 'การค้นหานอกเขตบริการ',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              }else{
                const toast = await this.toastCtrl.create({
                  showCloseButton: true,
                  message: 'โปรดกรอกระยะทางการค้นหา',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              }

            }catch(e){
              console.log('error send order in cart page',e);
            }
          }
        },{
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (data) => {
            //this handler set cancel order in database
            console.log('Confirm Cancel: blah');
            let post = {
              status: 'cancel',
              _method: 'put'
            }
            this.userService.apiPostDataService('orders/'+message.orderid,post);
          }
        }
      ]
    });
    await alert.present();
  }

  async customerAlert(message:any) {
    let msg = message.driverName+'<br/>'+message.driverPhone
    const alert = await this.alertCtrl.create({
      header: message.title,
      message: msg,
      buttons: [
        {
          text: 'รับทราบ',
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

