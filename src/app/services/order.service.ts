import { Injectable } from '@angular/core';
import { AuthService } from "src/app/config/authservice";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders = [];
  inprocessOrders = [];
  orderHistory = [];
  constructor(
    private Service: AuthService
  ) { }

  async initializeOrders() {
    this.inprocessOrders = [];
    this.orderHistory = [];
    console.log('Get History');
    try {
      await this.Service.apiGetDataService('orders').then(res=>{
        let result:any = res ;
        this.orders = Object.assign([],result.data).reverse();
        this.orders.forEach((obj) => obj.hidden = true)  
        this.orders.forEach((obj) => {
          if(obj.status != 'cancel' && obj.status != 'finish' && obj.status != 'nothing'){
            this.inprocessOrders.push(obj) ;
          }else{
            this.orderHistory.push(obj);
          }
        })   
        localStorage.setItem('inprocessOrders',JSON.stringify(this.inprocessOrders));
        localStorage.setItem('historyOrders',JSON.stringify(this.orderHistory)); 
      })
      console.log('inprocess :',this.inprocessOrders);
      console.log('history :' ,this.orderHistory);
    }
    catch (e) {
      console.error(e);
    }
  }

}
