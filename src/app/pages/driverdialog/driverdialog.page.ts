import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from '@angular/router';
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
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(
    private driverService:DriverService,
    private geolocation:Geolocation,
    private orderService:AuthService,
    private loadingCtrl: LoadingController
  ) { }

  
  ngOnInit() {
    this.initializeOrder();
    this.initMap();
  }

  async initializeOrder(){
    this.order = await this.driverService.getOrder();
    if(this.order != null){
    await this.orderService.apiGetOrder(this.order.orderid).then( (response) => {
      this.result = response
      this.orderStatus = this.result.data.status
    })
    }
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
  }

 
}
