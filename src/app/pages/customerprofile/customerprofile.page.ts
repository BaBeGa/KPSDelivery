import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController,NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { User, CartService } from '../../config/authservice';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ImagepickerComponent } from "../../components/imagepicker/imagepicker.component";
@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.page.html',
  styleUrls: ['./customerprofile.page.scss'],
})
export class CustomerprofilePage implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  userInfo: any;
  userType: any;
  userToken: any;
  cartLength = 0;

  constructor(
    public router: Router,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public http: Http, 
    public cartService: CartService

  ){ 

  }

  ngOnInit() {
    console.log('ionViewDidLoad customerProfilePage');
    this.userType = JSON.parse(localStorage.getItem('userType'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
    this.cartLength = this.cartService.getCartLength();
  }

  openCart() {
    this.router.navigateByUrl('basket');
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.router.navigateByUrl('customertabs'), 1000);
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

  async editProfile(ev:any) {
    console.log("editProfile");
    const popover = await this.popoverCtrl.create({
      component: ImagepickerComponent,
      event: ev,
      animated: true,
      translucent: true,
      showBackdrop: true
    });
    return await popover.present();
    //this.router.navigateByUrl('edit-profile');
  }
  async closePopover(){
    await this.popoverCtrl.dismiss();
  }

  editAddress() {
    console.log("editAddress");
    this.router.navigateByUrl('customeraddress');
  }

  setting() {
    console.log("setting");
    this.router.navigateByUrl('edit-profile');
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

  async recoveryPassword() {
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
