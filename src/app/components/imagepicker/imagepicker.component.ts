import { Component, OnInit } from '@angular/core';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { CustomerprofilePage } from "src/app/pages/customerprofile/customerprofile.page";
@Component({
  selector: 'app-imagepicker',
  templateUrl: './imagepicker.component.html',
  styleUrls: ['./imagepicker.component.scss'],
})
export class ImagepickerComponent implements OnInit {
  myPhoto: any;
  constructor(
    public camera: Camera,
    public cameraOption: CameraOptions,
    public popoval: CustomerprofilePage
  ) { }

  ngOnInit() {
    console.log('imagepicker popover');
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
  
  exit(){
  }

}
