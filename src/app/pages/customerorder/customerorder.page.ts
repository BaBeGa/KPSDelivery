import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/config/authservice";
@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.page.html',
  styleUrls: ['./customerorder.page.scss'],
})
export class CustomerorderPage implements OnInit {
  userInfo: any;
  userType: any;
  orders = [];
  constructor(
    public navCtrl: NavController, 
    public orderService: OrderService,
    private router:Router,
    private userService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { 
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
    console.log('ionViewDidLoad CustomerorderPage');
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.orders = JSON.parse(localStorage.getItem('inprocessOrders'));
    this.userType = JSON.parse(localStorage.getItem('userType'));
    console.log(this.orders)
  }

  async ionViewWillEnter() {
    this.userType = JSON.parse(localStorage.getItem('userType'));
    console.log('ionViewWillEnter CustomerorderPage');
    await this.orderService.initializeOrders();
    if (localStorage.getItem('userInfo') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    else {
      this.userInfo = null;
    }
    this.orders = JSON.parse(localStorage.getItem('inprocessOrders'));
    console.log(this.orders)
  }
  
  hide(index){
    this.orders[index].hidden = !this.orders[index].hidden
  }

  Ratings(order){
    let navigationExtras: NavigationExtras = {
      state: {
        order: order
      }
    };
    this.router.navigate(['raterestaurant'], navigationExtras);
  }

  async cancelOrder(orderId){
    const alert = await this.alertCtrl.create({
      header: 'การยืนยัน',
      message: 'คุณต้องการยกเลิกรายการสั่งซื้อนี้ หรือไม่?',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: async () => {
            let post = {
              status: 'cancel',
              _method: 'put'
            }
            await this.userService.apiPostDataService('orders/'+orderId,post).then(async res=>{
              const toast = await this.toastCtrl.create({
                message: 'ยกเลิกรายการสั่งซื้อเรียบร้อยแล้ว.',
                duration: 2000
              });
              toast.present();
            })
            if(this.userType == 'customer'){
              this.router.navigateByUrl('customertabs')
            }else{
              this.router.navigateByUrl('tabs-controller')
            }
          }
        },{
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
    
  }

}
