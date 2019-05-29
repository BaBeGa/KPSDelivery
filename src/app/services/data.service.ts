import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data=[];
  private orderList=[];
  constructor() { }

  setData(id, data){
    this.data[id]=data;
    for( var i = 0; i < this.orderList.length; i++){ 
      if ( this.orderList[i] == id) {
          this.orderList.splice(i, 1); 
          }
      }
    this.orderList.push(id);
    localStorage.setItem('Orderlist',JSON.stringify(this.orderList));
  }

  getData(id){
    if(id=='0'){
      return this.data;
    }else{
      return this.data[id];
    }
  }
  //callback
  getOrderlist(){
    return JSON.parse(localStorage.getItem('Orderlist'));
  }
}
