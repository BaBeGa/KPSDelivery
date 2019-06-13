import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { AuthService } from '../../config/authservice';
import { Headers } from '@angular/http';
@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.page.html',
  styleUrls: ['./customerorder.page.scss'],
})
export class CustomerorderPage implements OnInit {
  userToken: any;
  shippingOrder = [];
  userAllOrder = [];
  moreOne = true;
  userInfo :any
  constructor(
    public navCtrl: NavController, 
    public orderService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad CustomerorderPage');
    this.userToken = JSON.parse(localStorage.getItem('userToken'));
    this.getHistory();
  }

  ionViewWillEnter() {
    if (localStorage.getItem('userInfo') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    else {
      this.userInfo = null;
    }
  }
  
  async getHistory() {

    console.log('Get History');
    this.userAllOrder = [];
    this.shippingOrder = [];

    try {
      const result: any = await this.orderService.apiGetDataService('orders');
      console.log(result);

    }
    catch (e) {
      console.error(e);
    }

  }

  moreDetails(order_id) {    
    let navigationExtras: NavigationExtras = {
      state: {
        order_id: order_id
      }
    };
    this.router.navigate(['customerorderdetail'], navigationExtras);
  }

}
