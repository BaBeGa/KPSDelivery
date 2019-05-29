import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-customeravatar',
  templateUrl: './customeravatar.page.html',
  styleUrls: ['./customeravatar.page.scss'],
})
export class CustomeravatarPage implements OnInit {
  userInfo: any;
  constructor(
    public navCtrl: NavController, 
    private camera: Camera
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
   }

  ngOnInit() {
    console.log('ionViewDidLoad CustomeravatarPage');
  }

  ionViewWillEnter() {


  }

  changeAvatar() {

  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
