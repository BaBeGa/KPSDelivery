import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../config/authservice';
import { DriverService } from "src/app/services/driver.service";
import { LoadingController, ToastController, AlertController} from "@ionic/angular";
/* to get currentlocation */
import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google:any;
@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  @ViewChild('Map') 
  token:any;
  location:any;
  curlat:any;
  curlng:any;
  origin:any;
  userInfo:any;
  working: boolean;
  Onorder: boolean;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  destination = {
    lat:13.851070,
    lng:100.577713,
  }
  constructor(
    private geolocation: Geolocation,
    private userService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) { 
    this.checkOnorder();
  }

  async ngOnInit() {
    this.initWorkstatus();
    this.token = JSON.parse(localStorage.getItem('FCMToken'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.checkOnorder();
    this.saveTokenToBackend();
    this.initMap();
  }

  initWorkstatus(){
    let workStatus: any = JSON.parse(localStorage.getItem('workStatus'))
    if(workStatus == 1){
      this.working = true
    }else if(workStatus == 0){
      this.working = false
    }else{
      console.log('get workStatus fail: ',workStatus)
      this.working = false
    }
  }

  async checkOnorder(){
    let order = await this.driverService.getOrder();
    if(order != null ){
      this.Onorder = true
    }else{
      this.Onorder = false
    }
  }

  async saveTokenToBackend() {
    console.log(this.token);
    if(this.userInfo != null){
      let userID = this.userInfo.user.id;
    //console.log(userID);
    let body = { 
      id: userID,
      fcmToken: this.token
    }
    //console.log(body);
    await this.userService.apiPatchUpdateUser(body).then((result)=>{
      console.log('Save FCM_token status : ', result);
    }).catch(err => console.log(err));
    }
  }

  initMap() {
    var mapDiv = document.getElementById('map');
    //get current position lat=resp.coords.latitude,lng=resp.coords.longitude
    this.geolocation.getCurrentPosition().then((resp)=>{
      let pos = {
        lat:resp.coords.latitude, 
        lng:resp.coords.longitude
      }
      var map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: pos,
        mapTypeIds: 'roadmap'
      });
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
      this.attachSecretMessage(marker);
      this.curlat=resp.coords.latitude;
      this.curlng=resp.coords.longitude;
    }).catch((error)=>{console.log('Error getting location',error);
    
    });
  }

  attachSecretMessage(marker) {
    var infowindow = new google.maps.InfoWindow({
      content: 'ตำแหน่งของฉัน'
    });

    marker.addListener('click', () => {
      infowindow.open(marker.get('map'), marker);
    });
  }

  async workStatus(ev){
    console.log(ev.detail.checked)
    if(ev.detail.checked){
      let body = { 
      id: this.userInfo.user.id,
      workStatus: 1
      }
      await this.userService.apiPatchUpdateUser(body).then((result)=>{
        console.log('Update user success : ', result);
        this.working = true;
      }).catch(err => console.log(err));
    }else if(!ev.detail.checked){
      let body = { 
        id: this.userInfo.user.id,
        workStatus: 0
      }
      await this.userService.apiPatchUpdateUser(body).then((result)=>{
        console.log('Update user success : ', result);
        this.working = false;
      }).catch(err => console.log(err));
    }
  }

  async updateDriverlocation() {
    let body = { 
      id: this.userInfo.user.id,
      latValue: this.curlat,
      lonValue: this.curlng
    }
    await this.userService.apiPatchUpdateUser(body).then((result)=>{
      console.log('Update user location success : ', result);
      this.initMap();
      this.presentToast(3000,'อัพเดตตำแหน่งสำเร็จ');
    }).catch(err => console.log(err));
  }

  openOrder(){
    this.router.navigateByUrl('driverdialog');
  }

  async presentLoading(duration){
    const loader = await this.loadingCtrl.create({
      duration: duration
    });

    loader.present();
  }

  async presentToast(duration,msg){
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      message: msg,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

  async noWork(){
    const alert = await this.alertCtrl.create({
      header: 'ยังไม่มีงาน',
      message: 'เมื่อคุณรับงานเสร็จแล้ว ปุ่มนี้จะเปลี่ยนเป็นสีเขียวโดยอัตโนมัติ',
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.location,
      destination: this.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        //this.directionsDisplay.setDirections(response);
        //console.log(response);
        console.log(response.routes[0].legs[0].distance.value);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  //calculate the distance between origin and destination poins using google metrix distance apis
  calDistance() {
    //create request
    var req = {
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }
  }

}
