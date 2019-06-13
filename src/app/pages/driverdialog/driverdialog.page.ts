import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { LaunchNavigator,LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Router } from '@angular/router';
import { DriverService } from "src/app/services/driver.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from "src/app/config/authservice";

declare var google:any;
@Component({
  selector: 'app-driverdialog',
  templateUrl: './driverdialog.page.html',
  styleUrls: ['./driverdialog.page.scss'],
})
export class DriverdialogPage implements OnInit {
  state: any ;
  result: any;
  order: any;
  waypts = [];
  orderStatus: any;
  shipstatus: any
  destinatoin = [];
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    private driverService:DriverService,
    private geolocation:Geolocation,
    private orderService:AuthService,
    private loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator,
    private router:Router
  ) {
    
   }

  
  ngOnInit() {
    this.initializeOrder();
    this.initMap();
  }

  async initializeOrder(){
    this.order = await this.driverService.getOrder();
    if(this.order != null){
      await this.orderService.apiDriverGetOrder(this.order.orderid).then((response)=>{
        console.log(response);
        this.result = response
        this.orderStatus = this.result.orderStatus
        if(this.orderStatus == 'assigned'){
          this.destinatoin[0]=this.result.restaurantLatValue
          this.destinatoin[1]=this.result.restaurantLonValue
          this.shipstatus = 'กำลังนำส่ง'
        }else if(this.orderStatus == 'waiting'){
          this.destinatoin[0]=this.result.customerLatValue
          this.destinatoin[1]=this.result.customerLonValue
          this.shipstatus = 'เสร็จสิ้น'
        }
      })
    }
  }
  getcurrentGeolocation(){
    let pos:any
    this.geolocation.getCurrentPosition().then((res)=>{
      pos.lat = res.coords.latitude
      pos.lon = res.coords.longitude
    }).catch(err=>{
      console.log('cannot get current location :', err)
    })
    return pos
  }

  async showMap(destination){
    let pos=[];
    await this.geolocation.getCurrentPosition().then((res)=>{
      pos[0] = res.coords.latitude
      pos[1] = res.coords.longitude
    }).catch(err=>{
      console.log('cannot get current location :', err)
    })
    let options: LaunchNavigatorOptions = {
      start: pos,
      app: this.launchNavigator.APP.USER_SELECT
    }
    this.launchNavigator.navigate(destination , options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
  }

  initMap() {
    // var mapDiv = document.getElementById('map');
    // this.geolocation.getCurrentPosition().then((resp)=>{
    //   let pos = {
    //     lat:resp.coords.latitude, 
    //     lng:resp.coords.longitude
    //   }
    //   var map = new google.maps.Map(mapDiv, {
    //     zoom: 15,
    //     center: pos,
    //     mapTypeIds: 'roadmap'
    //   });
    // }).catch((error)=>{console.log('Error getting location',error);
    // });
  }

  async updateOrderStatus(){
    this.state = 'state'
    if(this.orderStatus == 'assigned'){
      let body = {
        _method: 'put',
        status: 'waiting'
      }
      this.loadingCtrl.create();
      console.log(this.orderStatus);
      await this.orderService.apiDriverOrder(this.order.orderid,body).then(async ()=>{
        await this.ngOnInit()
        this.loadingCtrl.dismiss();
      })

    }
    else if(this.orderStatus == 'waiting'){
      let body = {
        _method: 'put',
        status: 'shipped'
      }
      console.log(this.orderStatus);
      this.loadingCtrl.create();
      await this.orderService.apiDriverOrder(this.order.orderid,body).then(async ()=>{
        await this.ngOnInit();
        this.loadingCtrl.dismiss();
      })
    }
    
  }

  clearAll(){
    this.state = null
    this.result = null
    this.order = null
    this.waypts = [];
    this.orderStatus = null
    this.driverService.delOrder();
    this.router.navigateByUrl('tabs-controller')
  }

 
}
