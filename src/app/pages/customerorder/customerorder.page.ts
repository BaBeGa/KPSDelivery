import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../config/authservice';
import { Headers } from '@angular/http';
@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.page.html',
  styleUrls: ['./customerorder.page.scss'],
})
export class CustomerorderPage implements OnInit {
  userToken: any;
  userAllOrder: any;
  shippingOrder = [];
  constructor(
    public navCtrl: NavController, 
    public orderService: AuthService
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad CustomerorderPage');
  }
  
  ionViewWillEnter() {
    this.orderService.apiGetDataService('orders').then((result: any) => {
      this.userAllOrder = result.data;

      for (var i = 0; i < this.userAllOrder.length; i++) {
        if (this.userAllOrder[i].status != 'shipped') {
          this.shippingOrder.push(this.userAllOrder[i]);
        }
      }
    })
  }

}
