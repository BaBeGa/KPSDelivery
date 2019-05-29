import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-legalnterm',
  templateUrl: './legalnterm.page.html',
  styleUrls: ['./legalnterm.page.scss'],
})
export class LegalntermPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad LegalntermPage');
  }

}
