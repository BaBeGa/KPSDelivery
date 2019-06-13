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
  constructor(
    private userService: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userService.apiDriverGetHistory(this.userInfo.user.id).then(res=>{
      console.log(res);
    })
  }

}
