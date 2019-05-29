import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService, User } from '../../config/authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  response: any;
  local:any;
  userInfo:any;
  constructor(
    private router:Router,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loginService: AuthService
  ) { }

  ngOnInit() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(user) {

    this.loginService.postData('oauth/token', user).then((result) => {
      this.response = result;
      //console.log(result);
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      //console.log(this.userInfo);
      if (this.response.message == 'success') {
        this.router.navigateByUrl('customertabs');
      }      
    })    
  }

  goRegister() {
    this.router.navigateByUrl('register');
  }

  goForgotPassword() {
    this.router.navigateByUrl('forgotpassword');
  }

  backToProfile() {
    this.router.navigateByUrl('menu');
  }

}
