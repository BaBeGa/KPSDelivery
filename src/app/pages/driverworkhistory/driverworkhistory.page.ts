import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/config/authservice";
@Component({
  selector: 'app-driverworkhistory',
  templateUrl: './driverworkhistory.page.html',
  styleUrls: ['./driverworkhistory.page.scss'],
})
export class DriverworkhistoryPage implements OnInit {
  historyList: any;
  userInfo:any;
  loadDone: boolean;
  constructor(
    private userService: AuthService
  ) {
    this.loadDone = false;
   }

  ngOnInit() {
    this.loadDone = false;
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userService.apiDriverGetHistory().then(async res=>{
      let result:any = res ;
      this.historyList = await Object.assign([],result.data).reverse();
      await this.historyList.forEach((obj) => obj.hidden = true)
      console.log(this.historyList);
      this.loadDone = true;
    })
  }
  ionViewWillEnter() {
    this.loadDone = false;
    this.userService.apiDriverGetHistory().then(async res=>{
      console.log(res);
      let result:any = res ;
      this.historyList = await Object.assign([],result.data).reverse();
      await this.historyList.forEach((obj) => obj.hidden = true)
      console.log(this.historyList);
      this.loadDone = true;
    })
  }

  hide(index){
    this.historyList[index].hidden = !this.historyList[index].hidden
  }

}
