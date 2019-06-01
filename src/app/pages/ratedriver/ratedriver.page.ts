import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ratedriver',
  templateUrl: './ratedriver.page.html',
  styleUrls: ['./ratedriver.page.scss'],
})
export class RatedriverPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    
    ) { }

  ngOnInit() {
    console.log('ionViewDidLoad RatedriverPage');
  }

}
