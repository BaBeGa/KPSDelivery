import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, ToastController, LoadingController, MenuController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService, User } from '../../config/authservice';
import { AppComponent } from "src/app/app.component";

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
  public onLoginForm: FormGroup;
  constructor(
    private router:Router,
    private userInit: AppComponent,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public loginService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    console.log('ionViewDidLoad LoginPage');
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  doLogin() {
    this.user.email = this.onLoginForm.get('email').value;
    this.user.password = this.onLoginForm.get('password').value;
    
    this.loginService.postData('oauth/token', this.user).then((result) => {
      this.response = result;
      //console.log(result);
      //this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      //console.log(this.userInfo);
      if (this.response.message == 'success') {
        //this.router.navigateByUrl('customertabs');
        this.userInit.initializeUser();
      }      
    })    
  }

  goRegister() {
    this.router.navigateByUrl('register');
  }

  backToProfile() {
    this.router.navigateByUrl('menu');
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'ลืมพาสเวิร์ด?',
      message: 'โปรดระบุอีเมลของคุณ เพื่อส่งลิ้งค์แก้ไขรหัสผ่าน',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'ตกลง',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'ส่งอีเมลสำเร็จ',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        } 
      ]
    });

    await alert.present();
  }

}
