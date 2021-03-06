import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CartService } from "../../services/cart.service";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "../../config/authservice";
import { Router } from "@angular/router";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit { 
  selectedItems = [];
  totalPrice = 0;
  resItems:any;
  items = [];
  lat: any;
  lon: any;
  loading:any;
  cost:any;
  constructor(
    private cartService: CartService,
    public alertController: AlertController,
    private loadingCtrl:LoadingController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
    ) { }

  async ngOnInit() {
    await this.geolocation.getCurrentPosition().then((resp)=>{
      this.lat= resp.coords.latitude, 
      this.lon = resp.coords.longitude 
    });
    this.initialCart();
  }

  async ionViewWillEnter() {
    //this.loading = await this.loadingCtrl.create();
    //this.initialCart();
  }

  initialCart(){
    this.items = this.cartService.getCart();
    let selected = {};
    for (let obj of this.items) {
      if (selected[obj.food_id]) {
        selected[obj.food_id].food_qty += obj.food_qty;
      } else {
        selected[obj.food_id] = {...obj};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    let resObj = {};
    for (let obj of this.selectedItems) {
      if (resObj[obj.rid]) {
        var arrres = [];
        arrres.push(resObj[obj.rid]);
        arrres.push(obj);
        resObj[obj.rid] = arrres;
      } else {
        resObj[obj.rid] = {...obj};
      }
    }
    this.resItems = Object.keys(resObj).map(key => resObj[key]);
    console.log('cart page resItems',this.resItems);
    console.log('cart page resobj',this.items.length);
    this.totalPrice = this.selectedItems.reduce((a, b) => a + (b.food_qty * b.food_price), 0);//a mean oldresult of func
    if(this.items.length > 0){
      this.initialCost();
    }
  }

  async initialCost(){
    this.loading = await this.loadingCtrl.create({
      message: 'กำลังคำนวณค่าส่งอาหาร กรุณารอสักครู่...',
      translucent: true,
    });
    await this.loading.present();
    let body = {
      customer_lat_value:this.lat,
      customer_lon_value:this.lon,
      restaurant_id:this.selectedItems[0].restaurant_id
    }
    console.log(body)
    this.authService.apiGetCost(body).then(res=>{
      this.cost = res;
      console.log(this.cost);
      this.loading.dismiss();
    })
  }

  increaseItem(item){
    console.log('increaseItem ',item)
    this.items = this.cartService.increaseItem(item);
    this.initialCart();
  }

  decreaseItem(item){
    console.log('decreaseItem ',item)
    if(item.food_qty>1){
      this.items = this.cartService.decreaseItem(item);
    }else{
      this.presentAlertConfirm(item);
    }
    this.initialCart();
  }

  deleteItem(item){
    console.log('Order deleted!')
    this.items = this.cartService.delItem(item);
    this.initialCart();
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: 'นำสินค้าออก',
      message: 'คุณต้องการนำสินค้าออกใช่ไหม',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteItem(item);
          }
        },
        {
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

  async sendOrder() {
    let alert = await this.alertController.create({
      header: 'การยืนยัน',
      message: "ยืนยันที่จะสั่งซื้อหรือไม่<br/><br/>ระยะการค้นหาคนส่งอาหาร",
      inputs: [{
        name: 'limit',
        placeholder: 'ใส่ระยะการค้นหา(กิโลเมตร)',
        type: 'number',
        value: 5,
        min: 1,
        max: 20
      }],
      backdropDismiss: false,
      buttons: [{
        text: 'ตกลง',
        handler: async (data) => {
          try {
            if(data.limit > 0 && data.limit < 20){
              let postData = new FormData();
            postData.append('status', 'ordering');
            postData.append('restaurant_id', this.selectedItems[0].restaurant_id);
            postData.append('customer_lat_value',this.lat);
            postData.append('customer_lon_value',this.lon);
            console.log('form data: ' +this.selectedItems[0].restaurant_id);
            console.log('form data: ' +this.lat);
            console.log('form data: ' +this.lon);
            const result: any = await this.authService.apiPostDataService('orders', postData);
            console.log(result)
            for(let product of this.selectedItems){
              await this.putMenu(result.data.id, product.food_id, product.food_qty);
            }
            //console.log('finddriver'+result.data.order.id+'<br>'+ data.limit*1000);
            await this.findDriver(result.data.id,data.limit*1000);
            await this.orderService.initializeOrders();
            }else if(data.limit <= 0){
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'โปรดกรอกระยะทางการค้นหาอีกครั้ง',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }else if(data.limit >20){
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'การค้นหาคนขับนอกเขตบริการ',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }else{
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'โปรดกรอกระยะทางการค้นหา',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          }
          catch (e) {
            console.log('error send order in cart page',e);
          }
          
          this.cartService.clearCart();
          //console.log('Send Order Success');
        }
      }, {
        text: 'ยกเลิก',
        handler: () => {}
      }]
    });
    alert.present();
    //console.log(this.orderDetail);

  }

  async putMenu(order_id, menu_id, qty) {
    try {
      let postData = new FormData();
        postData.append('menu_id', menu_id);
        postData.append('quantity', qty);
        //const result: any = 
        await this.authService.apiPostDataService('orders/' + order_id + '/details', postData);
    }
    catch (e) {
      console.log('error putMenu fucn in cart page',e);
    }

  }

  async findDriver(orderId,limit) {
    this.authService.apiGetFinddriver(orderId,limit).then(async result=>{
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        message: 'กำลังค้นหาคนขับ...',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      //this.router.navigateByUrl('customerorder')
      console.log('Find Driver Success');
      console.log('Find driver service result :',result);
    });

  }
}
