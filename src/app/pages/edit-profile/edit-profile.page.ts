import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { AuthService } from "src/app/config/authservice";
import { CameraOptions, Camera, PictureSourceType } from "@ionic-native/camera/ngx";
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

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
  loading: any;
  images = [];
  constructor(
    private router:Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private updateData: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private storage: Storage, 
    private platform: Platform,
    private ref: ChangeDetectorRef, 
    private filePath: FilePath,
    private http:HttpClient
  ) { }

  ngOnInit() {
    console.log('editprofile page');
    this.userType = JSON.parse(localStorage.getItem('userType'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userInfo);
  }
  reloaduserInfo(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
      type: this.userInfo.user.type,
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
      this.router.navigateByUrl('customertabs/ctabs/customerprofile');
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
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'อัลบัม',
        icon: 'images',
        handler: () => {
          console.log('อัลบัม');
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit: false
    };
    this.camera.getPicture(options).then(imagePath => {
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                  this.uploadPhoto(imagePath);
                    // let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    // let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
            this.uploadPhoto(imagePath);
            // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
  }

  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  async startUpload(imgEntry) {
    this.loading = await this.loadingCtrl.create({
      message: 'กำลังอัพโหลดภาพ...'
    });

    this.loading.present();

    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.presentToast('Error while reading file.');
        });
  }
 
  readFile(file: any) {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.user.id;
    const reader = new FileReader();
    reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('image_file', imgBlob, file.name);
        formData.append('_method','put');
        formData.append('name',this.createFileName());
        this.updateData.uploadImageData(formData,'api/users/'+userId).then(async ()=>{
          await this.reloaduserInfo();
          // if(this.userType == 'driver'){
          //   this.router.navigateByUrl('tabs-controller/tabs/customerprofile')
          // }else{
          //   this.router.navigateByUrl('customertabs/ctabs/customerprofile')
          // }
        });
    };
    reader.readAsArrayBuffer(file);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  /////////////////////////////////////////////////////////////
  async uploadPhoto(imageFileUri: any) {
    window['resolveLocalFileSystemURL'](imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
      });
  }
  

    
}



