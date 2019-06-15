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

  order: any;
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
        this.order = this.router.getCurrentNavigation().extras.state.order;
      }
    });
    this.order_id = this.order.id;
    console.log(this.order);
  }

  ngOnInit() {
    console.log('ionViewDidLoad RaterestaurantPage');
    //this.loadInfo();
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
      header: 'คุณต้องการที่จะให้คะแนนคำสั่งชื้อนี้หรือไม่',
      message: message,
      buttons: [{
        text: 'ยกเลิก',
        handler: () => resolveFunction(false)
      }, {
        text: 'ตกลง',
        handler: () => resolveFunction(true)
      }]
    });
    alert.present();
    return promise;

  }

}
