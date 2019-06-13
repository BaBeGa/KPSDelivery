import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from "src/app/config/authservice";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raterestaurant',
  templateUrl: './raterestaurant.page.html',
  styleUrls: ['./raterestaurant.page.scss'],
})
export class RaterestaurantPage implements OnInit {

  order_id: any;
  order_details: any;
  order_info = {};
  rate_r: any = 0;
  rate_d: any = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthService, 
    private alertCtrl: AlertController 
    
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.order_id = this.router.getCurrentNavigation().extras.state.order_id;
      }
    });
    console.log(this.order_id);
  }

  ngOnInit() {
    console.log('ionViewDidLoad RaterestaurantPage');
    this.loadInfo();
  }

  async loadInfo() {
    try {
      this.order_details = await this.service.apiGetDataService('orders/' + this.order_id);
      const restaurantDetails: any = await this.service.apiGetService('restaurants/' + this.order_details.data.restaurant_id);
      const menuOrder: any = await this.service.apiGetDataService('orders/' + this.order_id + '/details');

      let menuDetails = [];
      for (var i = 0; i < menuOrder.data.length; i++) {
        const resultMenu: any = await this.service.apiGetService('menus/' + menuOrder.data[i].menu_id);
        menuDetails.push(resultMenu.data);
      }

      var newDetail = {
        restaurant_id: this.order_details.data.restaurant_id,
        restaurant_name: restaurantDetails.data.name,
        restaurant_image: restaurantDetails.data.image,
        menu: menuDetails
      };
      this.order_info = newDetail;
      //console.log(this.order_info);
    }
    catch (e) {
      console.log(e);
    }
  }

  point_R(point_r) {
    this.rate_r = point_r;
  }

  point_D(point_d) {
    this.rate_d = point_d;
  }

  rate() {
    
    this.confirmationAlert('ยืนยันการให้คะแนน').then(async confirm => {
      if (confirm) {
        
        let postData = new FormData();
        postData.append('_method', 'put');
        postData.append('status', 'finish');
        postData.append('restaurant_rating', this.rate_r);
        postData.append('driver_rating', this.rate_d);

        const result = await this.service.apiPostDataService('orders/' + this.order_id, postData);
        console.log(postData);
        
      }
    })


  }

  async confirmationAlert(message: string): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    let alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: message,
      buttons: [{
        text: 'No',
        handler: () => resolveFunction(false)
      }, {
        text: 'Yes',
        handler: () => resolveFunction(true)
      }]
    });
    alert.present();
    return promise;

  }

}
