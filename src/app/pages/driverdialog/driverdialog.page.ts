import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-driverdialog',
  templateUrl: './driverdialog.page.html',
  styleUrls: ['./driverdialog.page.scss'],
})
export class DriverdialogPage implements OnInit {

  constructor(private navParams: NavParams) { }
  ionViewWillLoad(){
    const data = this.navParams.get('message');
    console.log(data);
  }
  closeDDialog(){
    
  }
  ngOnInit() {
  }

}
