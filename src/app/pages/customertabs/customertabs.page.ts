import { Component, OnInit } from '@angular/core';
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-customertabs',
  templateUrl: './customertabs.page.html',
  styleUrls: ['./customertabs.page.scss'],
})
export class CustomertabsPage implements OnInit {
  orders = [];
  inprocessOrders = [];
  orderHistory = [];
  constructor(
    private orderService : OrderService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userInfo')!= null){
      this.orderService.initializeOrders();
    }
  }

  ionViewWillEnter() {
    //this.orderService.initializeOrders();
  }
}
