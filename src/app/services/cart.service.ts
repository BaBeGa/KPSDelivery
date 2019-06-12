import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = [];
  constructor() { }

  getCart(){
    if(JSON.parse(localStorage.getItem('cart'))!=null){
      this.cart = JSON.parse(localStorage.getItem('cart'));
      return JSON.parse(localStorage.getItem('cart'))
    }else{
      return this.cart
    }
  }

  addProduct(product){
    this.cart.push(product);
    this.saveCart();
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
    return this.cart.length;
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
}
