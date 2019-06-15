import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OrderService } from "src/app/services/order.service";
import { Headers } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userToken: any;
  orderHistory = [];
  constructor(
    public navCtrl: NavController, 
    public orderService: OrderService,
    private router:Router,
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad HistoryPage');
    this.userToken = JSON.parse(localStorage.getItem('userToken'));
    this.getHistory();
  }

  async getHistory() {
    this.orderHistory = JSON.parse(localStorage.getItem('historyOrders'));
  }

  rateRestaurant(order_id) {
    let navigationExtras: NavigationExtras = {
      state: {
        order_id: order_id
      }
    };
    this.router.navigate(['raterestaurant'], navigationExtras);
  }

  moreDetails(order_id) {

    let navigationExtras: NavigationExtras = {
      state: {
        order_id: order_id
      }
    };
    this.router.navigate(['history-detail'], navigationExtras);
  }

}
