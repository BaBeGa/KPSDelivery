import { Component, OnInit } from '@angular/core';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { CustomerprofilePage } from "src/app/pages/customerprofile/customerprofile.page";
@Component({
  selector: 'app-imagepicker',
  templateUrl: './imagepicker.component.html',
  styleUrls: ['./imagepicker.component.scss'],
})
export class ImagepickerComponent implements OnInit {
  myPhoto: any ;
  constructor(
    public camera: Camera,
    public cameraOption: CameraOptions,
    private close: CustomerprofilePage
  ) { }

  ngOnInit() {
    console.log('imagepicker popover');
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      console.log('get Image form gallary error!' , err);
     });
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData)=>{
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err)=>{
      console.log('get Image form gallary error!' , err);
    });
  }
  
  exit(){
    this.close.closePopover();
  }

}
