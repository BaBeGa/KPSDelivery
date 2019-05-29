import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, NavParams } from '@ionic/angular';
import { AuthService } from '../../config/authservice';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  data: any;
  order_id: any;
  userToken: any;
  shippingOrder = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public orderService: AuthService
  ){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state;
      }
    });
    this.order_id = this.data.order_id;
   }

  ngOnInit() {
    console.log('ionViewDidLoad HistoryDetailPage');
  }

  ionViewWillEnter() {

    this.userToken = JSON.parse(localStorage.getItem('userToken'));
    this.getHistory();

  }

  async getHistory() {

    console.log('Get History');
    this.shippingOrder = [];
    let order_id = this.navParams.get('order_id');
    console.log(order_id);
    
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.userToken);

    try {
      const result: any = await this.orderService.apiGetDataService('orders/' + order_id, headers);
      //console.log(result);

      if (result.data.status == 'shipped') {
        result.data.status = 'การจัดส่งเรียบร้อย';

        let driver_id = result.data.driver_id;
        let status = result.data.status;
        let total_qty = result.data.quantity;
        let total_price = result.data.total_price;
        let shipped_time = result.data.shipped_time;

        const orderMenu: any = await this.orderService.apiGetDataService('orders/' + result.data.id + '/details', headers);
        //console.log(orderMenu);
        
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
              shipped_time: shipped_time
            }]
          };

          //console.log(newDetail);
          this.shippingOrder.push(newDetail);

        }

      }

      console.log(this.shippingOrder);

    }
    catch (e) {
      console.error(e);
    }
  }

}
