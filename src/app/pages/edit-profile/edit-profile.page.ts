import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UpdateDataService } from "src/app/config/authservice";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userInfo:any ;
  constructor(
    private router:Router,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private updateData: UpdateDataService
  ) { }

  ngOnInit() {
    console.log('editprofile page');
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }
  setsex(sex){
    this.userInfo.userInfo.sex = sex;
  }
  settype(type){
    this.userInfo.user.type = type;
  }
  
  async sendData() {
    this.updateData.apiUpdateUser(this.userInfo);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'บันทึกการตั้งค่าสำเร็จ',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.router.navigateByUrl('customerprofile');
    });
  }

}

