import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Router, NavigationExtras } from '@angular/router';
import { AuthService, User} from '../../config/authservice';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  user = {} as User;
  response: any;
  lat:any;
  lon:any;
  constructor(
    private router:Router,
    private datePipe: DatePipe,
    public registerService: AuthService, 
    public http: Http,
    private geolocation:Geolocation
  ) { 

  }

  ngOnInit() {
    console.log('ionViewDidLoad RegisterPage');
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.lat=resp.coords.latitude 
      this.lon=resp.coords.longitude
    }).catch((error)=>{console.log('Error getting location',error);});
  }

  // onSubmit() {
  //   const userData = this.user;
  //   const registerForm = this.registerForm.value;

  //   userData.email = registerForm.userData.email;
  //   userData.name = registerForm.userData.name;
  //   userData.type = 'customer';
  //   userData.password = registerForm.passwords.password;
  //   userData.c_password = registerForm.passwords.c_password;

  //   this.registerService.apiRegister(userData, 'register').then((result) => {
  //     this.response = result;
  //     if (this.response.success == true) {
  //       this.router.navigateByUrl('login');
  //     }      
  //   })    

  //   this.registerForm.resetForm();
  // }
  onSubmit() {
    const userData = this.user;
    const registerForm = this.registerForm.value;

    userData.email = registerForm.userData.email;
    userData.name = registerForm.userData.name;
    userData.type = registerForm.userData.type;
    userData.password = registerForm.passwords.password;
    userData.c_password = registerForm.passwords.c_password;
    userData.firstname = registerForm.userData.firstname;
    userData.lastname = registerForm.userData.lastname;
    userData.id_number = registerForm.userData.id_number;
    userData.sex = registerForm.userData.sex;
    userData.dob =this.datePipe.transform(registerForm.userData.dob, 'dd-MM-yyyy');
    // const dateTime = registerForm.userData.dob;
    // const parts = dateTime.split(/[-]/);
    // userData.dob = registerForm.userData.dob.format()
    // userData.dob =`${parts[2]}-${parts[1]}-${parts[0]}`;
    userData.address = registerForm.userData.address;
    userData.subdistrict = registerForm.userData.subdistrict;
    userData.district = registerForm.userData.district;
    userData.province = registerForm.userData.province;
    userData.zipcode = registerForm.userData.zipcode;
    userData.phonenumber = registerForm.userData.phonenumber;
    userData.lat_value = JSON.stringify(this.lat);
    userData.lon_value = JSON.stringify(this.lon);

    //console.log(registerForm);
    console.log(userData);

    this.registerService.apiRegister(userData, 'register').then((result) => {
      this.response = result;
      if (this.response.success == true) {
        this.router.navigateByUrl('login');
        // this.navCtrl.push(LoginPage);
      }      
    })

    this.registerForm.resetForm();
  }


}
