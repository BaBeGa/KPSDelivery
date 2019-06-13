import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../config/authservice';
import { Headers } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userToken: any;
  userAllOrder = [];
  shippingOrder = [];
  moreOne = true;

  constructor(
    public navCtrl: NavController, 
    public orderService: AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad HistoryPage');
    this.userToken = JSON.parse(localStorage.getItem('userToken'));
    this.getHistory();
  }

  async getHistory() {

    console.log('Get History');
    this.userAllOrder = [];
    this.shippingOrder = [];

    try {
      const result: any = await this.orderService.apiGetDataService('orders');
      console.log(result)
    }
    catch (e) {
      console.error(e);
    }


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
