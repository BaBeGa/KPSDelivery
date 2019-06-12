import { Injectable } from '@angular/core';
import { AuthService } from "src/app/config/authservice";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  order:any;
  res: any;
  constructor(
    private driverService: AuthService
  ) { }

  setOrder(order){
    this.order = order
    localStorage.setItem('driverorder',JSON.stringify(order));
  }

  getOrder(){
    this.order = JSON.parse(localStorage.getItem('driverorder'));
    return this.order
  }

  delOrder(){
    this.order=null
    localStorage.setItem('driverorder',JSON.stringify(this.order));
  }

  async getCredit(){
    await this.driverService.apiDriverCredit().then(res=>{
      this.res = res
    })
    if(this.res != null){
      return this.res
    }else{
      return null
    }
  }
}
