import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/config/authservice";
@Component({
  selector: 'app-driverworkhistory',
  templateUrl: './driverworkhistory.page.html',
  styleUrls: ['./driverworkhistory.page.scss'],
})
export class DriverworkhistoryPage implements OnInit {
  history: any;
  userInfo:any;
  loadDone: boolean;
  constructor(
    private userService: AuthService
  ) {
    this.loadDone = false;
   }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userService.apiDriverGetHistory(this.userInfo.user.id).then(res=>{
      console.log(res);
      let result:any = res ;
      this.history = Object.assign([],result.driverHistory).reverse();
      this.loadDone = true;
    })
  }
  ionViewWillEnter() {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // this.userService.apiDriverGetHistory(this.userInfo.user.id).then(res=>{
    //   console.log(res);
    //   let result:any = res ;
    //   this.history = Object.assign([],result.driverHistory).reverse();
    //   this.loadDone = true;
    // })
  }

}
