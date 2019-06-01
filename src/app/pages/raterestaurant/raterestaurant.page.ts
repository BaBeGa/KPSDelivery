import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-raterestaurant',
  templateUrl: './raterestaurant.page.html',
  styleUrls: ['./raterestaurant.page.scss'],
})
export class RaterestaurantPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad RaterestaurantPage');
  }

}
