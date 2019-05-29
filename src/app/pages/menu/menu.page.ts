import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, IonNav } from '@ionic/angular';
//import { CustomertabsPage } from '../customertabs/customertabs';
//import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { AuthService, User } from '../../config/authservice';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  userType: any;
  @ViewChild(IonNav) nav: IonNav;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userService: AuthService
  ) { }

  ngOnInit() {
    // console.log('User Type menu: '+this.userType);
    // if(this.userType == null) {
    //   this.navCtrl.setRoot(CustomertabsPage);
    // }
    // else if(this.userType.type == 'driver') {
    //   this.navCtrl.setRoot(TabsControllerPage);
    // }
    // else if(this.userType.type == 'user') {
    //   this.navCtrl.setRoot(CustomertabsPage);
    // }
    // else {
    //   this.navCtrl.setRoot(CustomertabsPage);
    // }
  }
  

}
