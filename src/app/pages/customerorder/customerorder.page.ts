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
  
  async getHistory() {

    console.log('Get History');
    this.userAllOrder = [];
    this.shippingOrder = [];

    try {
      const result: any = await this.orderService.apiGetDataService('orders');
      //console.log(result);

      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].status == 'ordering' || result.data[i].status == 'assigned') {
          if (result.data[i].status == 'ordering')
            result.data[i].status = 'กำลังดำเนินการหาคนส่งอาหาร';
          if (result.data[i].status == 'assigned')
            result.data[i].status = 'กำลังรออาหาร';
          this.userAllOrder.push(result.data[i]);

          let driver_id = result.data[i].driver_id;
          let status = result.data[i].status;
          let total_qty = result.data[i].quantity;
          let total_price = result.data[i].food_price;
          let created_time = result.data[i].created_at;

          const orderMenu: any = await this.orderService.apiGetDataService('orders/' + result.data[i].id + '/details');
          //console.log(orderMenu);
          // console.log(orderMenu.data.length);
          if (orderMenu.data.length <= 1 || orderMenu.data.length == null || orderMenu.data.length == []) {
            this.moreOne = false;
          }
          else {
            this.moreOne = true;
          }

          for (var i = 0; i < orderMenu.data.length; i++) {

            let food_id = orderMenu.data[i].menu_id;
            let order_id = orderMenu.data[i].order_id;
            let food_qty = orderMenu.data[i].quantity;

            const menuDetail: any = await this.orderService.apiGetService('menus/' + orderMenu.data[i].menu_id)
            //console.log(menuDetail);

            let food_name = menuDetail.data.name;
            let food_price = menuDetail.data.price;
            let restaurant_id = menuDetail.data.restaurant_id;

            const restaurantDetail: any = await this.orderService.apiGetService('restaurants/' + menuDetail.data.restaurant_id);

            let restaurant_name = restaurantDetail.data.name;
            let restaurant_image = restaurantDetail.data.image;

            var newDetail = {
              order_id: order_id,
              moreOne: this.moreOne,
              details: [{
                driver_id: driver_id,
                restaurant_id: restaurant_id,
                restaurant_name: restaurant_name,
                restaurant_image: restaurant_image,
                food_id: food_id,
                food_name: food_name,
                food_price: food_price,
                food_qty: food_qty,
                status: status,
                total_qty: total_qty,
                total_price: total_price,
                created_time: created_time
              }]
            };
            //console.log(newDetail);
          }
          this.shippingOrder.push(newDetail);
        }
      }
      //console.log(this.shippingOrder);
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
