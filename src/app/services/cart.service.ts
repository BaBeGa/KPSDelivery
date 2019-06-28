import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = [];
  loading: any;
  constructor(
    private loadingCtrl:LoadingController,
    private alertController:AlertController,
    private router:Router
  ) { }

  getCart(){
    if(JSON.parse(localStorage.getItem('cart'))!=null){
      this.cart = JSON.parse(localStorage.getItem('cart'));
      return JSON.parse(localStorage.getItem('cart'))
    }else{
      return this.cart
    }
  }

  async addProduct(product){
    if(product.restaurant_id != this.cart[0].restaurant_id){
      const alert = await this.alertController.create({
        header: 'ไม่สารมารถเพิ่มอาหารได้',
        message: 'กรุณาเลือกอาหารที่อยู่ในร้านเดียวกัน',
        buttons: [
          {
            text: 'ตกลง',
            handler: async () => {
              console.log('Confirm Okay');
              this.router.navigateByUrl('customertabs/ctabs/foodcenter')
            }
          }
        ]
      });
      await alert.present();
    }else{
      this.cart.push(product);
      this.saveCart();
    }
  }

  increaseItem(item){
    item.food_qty = 1;
    this.cart.push(item)
    this.saveCart();
    return this.cart ;
  }

  decreaseItem(item){
    let index = this.cart.findIndex(index=>{
      console.log('index of item',index);
      return index.food_id == item.food_id
    })
    if(this.cart[index].food_qty>1){
      this.cart[index].food_qty--
      this.saveCart();
      return this.cart
    }else{
      this.cart.splice(index,1)
      this.saveCart();
      return this.cart
    }
  }

  delItem(item){
    for (var i = 0; i < this.cart.length; i++) {
      if (item.food_id == this.cart[i].food_id) {
        this.cart.splice(i, 1);
      }
    }
    this.saveCart();
    return this.cart
  }
  
  getCartLength(){
    if(JSON.parse(localStorage.getItem('cart'))!=null){
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    let length=0;
    for (let obj of this.cart) {
      length += obj.food_qty;
    }
    console.log(this.cart)
    console.log("cart length = "+length)
    return length;
  }
  
  clearCart(){
    this.cart = [];
    this.saveCart();
  }

  saveCart(){
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }

  async removeProduct(product) {
    for (var i = 0; i < this.cart.length; i++) {
      if (product.food_id == this.cart[i].food_id) {
        this.cart.splice(i, 1);
      }
    }
    this.saveCart();
    return this.cart
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
  }

  async dismiddLoading(){
    this.loading.dismiss();
  }
}
