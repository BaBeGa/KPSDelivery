import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
//import { FoodstorePage } from "src/app/pages/foodstore/foodstore.page";

@Component({
  selector: 'app-food-add-remove',
  templateUrl: './food-add-remove.page.html',
  styleUrls: ['./food-add-remove.page.scss'],
})
export class FoodAddRemovePage implements OnInit {
  product: any;
  quantity = 1;
  noProduct = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    public alertController: AlertController,
  ){
   }

  ngOnInit() {
    console.log('ionViewDidLoad FoodAddRemovePage');
    //console.log(this.navParams.data);
    this.product = this.navParams.data ;
  }

  //เพิ่มอาหารลงตะกร้า
  async addToCart() {
    var newProduct = {
      restaurant_id: this.product.restaurant_id,
      restaurant_name: this.product.restaurant_name,
      food_id: this.product.id,
      food_name: this.product.name,
      food_price: this.product.price,
      food_qty: this.quantity
    };
    if(JSON.parse(localStorage.getItem('userInfo')) == null ){
      this.noProduct = null;
      this.presentAlertConfirm();
      return this.closePopover();
    }
    else if(this.quantity == 0){
      this.noProduct = "Please choose quantity.";
    }else{
      this.noProduct = null;
      this.cartService.addProduct(newProduct);
      return this.closePopover();
    }

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'โปรดเข้าสู่ระบบ',
      message: 'กรุณาเข้าสู่ระบบเพื่อสั่งชื้ออาหาร',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('login');
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
  //เพิ่มอาหาร
  addProduct() {
    this.quantity += 1;
  }

  //ลดอาหาร
  removeProduct() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }

  closePopover(){
    this.popoverCtrl.dismiss();
  }
}
