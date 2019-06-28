import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/config/authservice";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userToken: any;
  userInfo: any;
  orderHistory = [];
  constructor(
    public navCtrl: NavController, 
    public orderService: OrderService,
    private router:Router,
    private historyService: AuthService
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad HistoryPage');
    //this.orderHistory = JSON.parse(localStorage.getItem('historyOrders'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  async ionViewWillEnter() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(this.userInfo != null){
      await this.orderService.initializeOrders();
      this.orderHistory = JSON.parse(localStorage.getItem('historyOrders'));
      console.log(this.orderHistory);
    }
  }

  hide(index){
    this.orderHistory[index].hidden = !this.orderHistory[index].hidden
  }

  Ratings(order){
    let navigationExtras: NavigationExtras = {
      state: {
        order: order
      }
    };
    this.router.navigate(['raterestaurant'], navigationExtras);
  }

  delHistory(index){
    let orderId = this.orderHistory[index].id;
    let body = {
      _method: 'put',
      status: 'delete'
    }
    this.historyService.apiPostDataService('orders/'+orderId,body).then(res=>{
      this.router.navigateByUrl('customertabs/ctabs/history');
    })
  }

}
