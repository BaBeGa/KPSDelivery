import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { CartService } from "../../services/cart.service";
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
  constructor(
    private cartService: CartService,
    public alertController: AlertController,
    ) { }

  ngOnInit() {
    this.initialCart();
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
    console.log('cart page resobj',resObj);
    this.totalPrice = this.selectedItems.reduce((a, b) => a + (b.food_qty * b.food_price), 0);//a mean oldresult of func
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

  sentOrder(){
    console.log('Order sended!')
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
}
