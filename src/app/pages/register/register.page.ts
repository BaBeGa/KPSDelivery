import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService, User} from '../../config/authservice';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  user = {} as User;
  response: any;

  constructor(
    private router:Router,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public registerService: AuthService, 
    public http: Http
  ) { 

  }

  ngOnInit() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit() {
    const userData = this.user;
    const registerForm = this.registerForm.value;

    userData.email = registerForm.userData.email;
    userData.name = registerForm.userData.name;
    userData.type = 'customer';
    userData.password = registerForm.passwords.password;
    userData.c_password = registerForm.passwords.c_password;

    this.registerService.apiRegister(userData, 'register').then((result) => {
      this.response = result;
      if (this.response.success == true) {
        this.router.navigateByUrl('login');
      }      
    })    

    this.registerForm.resetForm();
  }


}
