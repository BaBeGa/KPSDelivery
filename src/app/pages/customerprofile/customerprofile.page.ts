import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { User, CartService } from '../../config/authservice';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.page.html',
  styleUrls: ['./customerprofile.page.scss'],
})
export class CustomerprofilePage implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  userInfo: any;
  userToken: any;
  cartLength = 0;

  constructor(
    private router:Router,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toastCtrl: ToastController, 
    public cartService: CartService

  ){ 

  }

  ngOnInit() {
    console.log('ionViewDidLoad customerProfilePage');
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.cartLength = this.cartService.getCartLength();
  }

  openCart() {
    this.router.navigateByUrl('basket');
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.router.navigateByUrl('menu'), 1000);
  }

  login() {
    setTimeout(() => this.router.navigateByUrl('login'), 1000);
  }

  history() {
    console.log("History");
    this.router.navigateByUrl('history');
  }

  shipping() {
    console.log("shipping");
    this.router.navigateByUrl('customerorder');
  }

  rateRestaurants() {
    console.log("rateRestaurants");
    this.router.navigateByUrl('raterestaurant');
  }

  rateDriver() {
    console.log("rateDriver");
    this.router.navigateByUrl('ratedriver');
  }

  editProfile() {
    console.log("editProfile");
    this.router.navigateByUrl('customeraccount');
  }

  editAddress() {
    console.log("editAddress");
    this.router.navigateByUrl('customeraddress');
  }

  helpcenter() {
    console.log("helpcenter");
    this.router.navigateByUrl('helpcenter');
  }

  legalnterm() {
    console.log("legalnterm");
    this.router.navigateByUrl('legalnterm');
  }

  changeAvatar() {
    console.log("avatar");
    this.router.navigateByUrl('customeravatar');
  }

  register() {
    this.router.navigateByUrl('register');
  }

  recoveryPassword() {
    this.router.navigateByUrl('forgotpassword');
  }


}
