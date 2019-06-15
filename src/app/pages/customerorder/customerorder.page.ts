import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.page.html',
  styleUrls: ['./customerorder.page.scss'],
})
export class CustomerorderPage implements OnInit {
  userInfo :any
  orders = [];
  constructor(
    public navCtrl: NavController, 
    public orderService: OrderService,
    private router:Router
  ) { 

  }

  ngOnInit() {
    console.log('ionViewDidLoad CustomerorderPage');
    this.orders = JSON.parse(localStorage.getItem('inprocessOrders'));
    console.log(this.orders)
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter CustomerorderPage');
    this.orders = [];
    await this.orderService.initializeOrders();
    if (localStorage.getItem('userInfo') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    else {
      this.userInfo = null;
    }
    this.orders = JSON.parse(localStorage.getItem('inprocessOrders'));
    console.log(this.orders)
  }
  
  hide(index){
    this.orders[index].hidden = !this.orders[index].hidden
  }

  Ratings(order){
    let navigationExtras: NavigationExtras = {
      state: {
        order: order
      }
    };
    this.router.navigate(['raterestaurant'], navigationExtras);
  }

}
