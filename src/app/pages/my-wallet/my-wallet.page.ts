import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/config/authservice";
import { DriverService } from "src/app/services/driver.service";

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  userCredit: 0;
  userCreditNum: any;
  res: any;
  allowAccept: boolean;
  userInfo:any ;
  constructor(
    private userService:AuthService,
    private driverService: DriverService
  ) { }

  async ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.res = await this.driverService.getCredit()
    console.log(this.res)
    if(this.res != null){
      if(this.res.data.driver_status==1){
        this.allowAccept = true
        this.userCredit = this.res.data.credit.credit
        this.userCreditNum = this.res.data.credit.creditnumber
      }else{
        this.allowAccept = false
      }
    }
  }

}
