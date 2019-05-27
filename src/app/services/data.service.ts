import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data=[];
  constructor() { }

  setData(id, data){
    this.data[id]=data;
  }

  getData(id){
    if(id==0){
      return this.data;
    }else{
      return this.data[id];
    }
  }
}
