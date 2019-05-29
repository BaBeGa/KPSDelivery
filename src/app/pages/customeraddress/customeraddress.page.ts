import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-customeraddress',
  templateUrl: './customeraddress.page.html',
  styleUrls: ['./customeraddress.page.scss'],
})
export class CustomeraddressPage implements OnInit {
  data:string = '';
  constructor(
    public navCtrl: NavController, 
    private geolocation: Geolocation
    ) { 

    }

  ngOnInit() {
    console.log('ionViewDidLoad CustomeraddressPage');
  }

  locate() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.data = 'Lat: ' + res.coords.latitude + ' <br>' + res.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
