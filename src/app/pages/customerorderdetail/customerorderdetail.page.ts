import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import { AuthService } from '../../config/authservice';

@Component({
  selector: 'app-customerorderdetail',
  templateUrl: './customerorderdetail.page.html',
  styleUrls: ['./customerorderdetail.page.scss'],
})
export class CustomerorderdetailPage implements OnInit {
  order_id: any;
  order_details: any;
  order_info = {};
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
   }

  ngOnInit() {
    console.log(this.order_id);
    this.loadInfo();
  }

  async loadInfo() {
    try {
      this.order_details = await this.service.apiGetDataService('orders/' + this.order_id);
      //console.log(this.order_details);
      const restaurantDetails: any = await this.service.apiGetService('restaurants/' + this.order_details.data.restaurant_id);
      const menuOrder: any = await this.service.apiGetDataService('orders/' + this.order_id + '/details');
      //console.log(menuOrder);

      let menuDetails = [];
      for (var i = 0; i < menuOrder.data.length; i++) {
        let menuQty = menuOrder.data[i].quantity;
        const resultMenu: any = await this.service.apiGetService('menus/' + menuOrder.data[i].menu_id);
        var newMenu = {
          quantity: menuQty,
          name: resultMenu.data.name,
          price: resultMenu.data.price
        }
        menuDetails.push(newMenu);
      }

      var newDetail = {
        restaurant_id: this.order_details.data.restaurant_id,
        restaurant_name: restaurantDetails.data.name,
        restaurant_image: restaurantDetails.data.image,
        menu: menuDetails
      };
      this.order_info = newDetail;
      // console.log(this.order_info);      
    }
    catch (e) {
      console.log(e);
    }
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
