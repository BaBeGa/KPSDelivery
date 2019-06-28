import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private toastController: ToastController
    
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.order = this.router.getCurrentNavigation().extras.state.order;
      }
    });
  }

  ngOnInit() {
    console.log('ionViewDidLoad RaterestaurantPage');
    this.order_id = this.order.id;
    console.log(this.order);
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
        postData.append('status', 'rating');
        if(this.rate_d != 0 || this.rate_d != 0){
          postData.append('restaurant_rating', this.rate_r);
          postData.append('driver_rating', this.rate_d);
        }
        await this.service.apiPostDataService('orders/' + this.order_id, postData).then( async res=>{
          const toast = await this.toastController.create({
            message: 'เสร็จสิ้น',
            duration: 3000
          });
          toast.present();
          this.router.navigateByUrl('customerprofile');
          console.log(res);
        })
        
        
      }
    })


  }

  async confirmationAlert(message: string): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    let alert = await this.alertCtrl.create({
      header: 'คุณต้องการที่จะให้คะแนนคำสั่งซื้อนี้หรือไม่',
      message: message,
      buttons: [ {
        text: 'ตกลง',
        handler: () => resolveFunction(true)
      },{
        text: 'ยกเลิก',
        handler: () => resolveFunction(false)
      }]
    });
    alert.present();
    return promise;

  }

}
