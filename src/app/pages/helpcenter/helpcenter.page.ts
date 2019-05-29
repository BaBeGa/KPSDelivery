import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.page.html',
  styleUrls: ['./helpcenter.page.scss'],
})
export class HelpcenterPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad HelpcenterPage');
  }

}
