import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { AuthService } from "src/app/config/authservice";
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userInfo: any;
  userType: any;
  myPhoto: any;
  Password: any;
  constructor(
    private router:Router,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private updateData: AuthService,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public file: File
  ) { }

  ngOnInit() {
    console.log('editprofile page');
    this.userType = JSON.parse(localStorage.getItem('userType'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
  }
  setsex(sex){
    this.userInfo.userInfo.sex = sex;
  }
  settype(type){
    this.userInfo.user.type = type;
  }
  
  async sendData() {
    let body = {
      id: this.userInfo.user.id,
      name: this.userInfo.user.name,
      firstname: this.userInfo.userinfo.firstname,
      lastname: this.userInfo.userinfo.lastname,
      email: this.userInfo.user.email,
      type: this.userType,
      phonenumber: this.userInfo.userinfo.phonenumber,
      address: this.userInfo.userinfo.address,
      province: this.userInfo.userinfo.province,
      district: this.userInfo.userinfo.district,
      subdistrict: this.userInfo.userinfo.subdistrict,
      zipcode: this.userInfo.userinfo.zipcode,
    }
    this.updateData.apiPatchUpdateUser(body);
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async () => {
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

  async openCamera(){
    console.log('Open camera');
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    await this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      console.log('get Image form gallary error!' , err);
     });
  }

  async editProfile() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'ตัวเลือก',
      buttons: [{
        text: 'กล้อง',
        icon: 'camera',
        handler: () => {
          console.log('กล้อง');
          this.openCamera();
        }
      }, {
        text: 'อัลบัม',
        icon: 'images',
        handler: () => {
          console.log('อัลบัม');
          this.openGallery();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async openGallery(){
    console.log('Open gallery');
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    await this.camera.getPicture(options).then((imageData)=>{
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err)=>{
      console.log('get Image form gallary error!' , err);
    });
  }


}

