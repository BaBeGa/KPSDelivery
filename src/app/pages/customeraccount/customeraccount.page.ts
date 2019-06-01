import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-customeraccount',
  templateUrl: './customeraccount.page.html',
  styleUrls: ['./customeraccount.page.scss'],
})
export class CustomeraccountPage implements OnInit {
  userInfo: any;
  constructor(
    private router:Router,
    public navCtrl: NavController, 
  ) { 
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
    console.log('ionViewDidLoad CustomeraccountPage');
  }
}
