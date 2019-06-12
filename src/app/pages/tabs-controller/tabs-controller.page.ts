import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from "src/app/services/driver.service";
@Component({
  selector: 'app-tabs-controller',
  templateUrl: './tabs-controller.page.html',
  styleUrls: ['./tabs-controller.page.scss'],
})
export class TabsControllerPage implements OnInit {
  allowAccept: boolean;
  res: any;
  constructor(
    public router:Router,
    private driverService: DriverService
    ) { }

  async ngOnInit() {
    this.res = await this.driverService.getCredit()
    console.log(this.res,'  ',this.res.data.driver_status);
      if(this.res != null){
        if(this.res.data.driver_status==1){
          this.allowAccept = true
        }else{
          this.allowAccept = false
        }
      }
  }
}


