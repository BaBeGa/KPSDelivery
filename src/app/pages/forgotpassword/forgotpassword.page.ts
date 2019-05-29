import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

}
