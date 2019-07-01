import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "src/app/config/authservice";
import { DriverService } from "src/app/services/driver.service";
import { CameraOptions, Camera, PictureSourceType } from "@ionic-native/camera/ngx";
import { Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const STORAGE_KEY = 'slip';
@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  userCredit: 0;
  userCreditNum: any;
  res: any;
  allowAccept: boolean;
  userInfo:any ;
  credittopup: any;
  images = [];
  currentImage:any;
  imageFileUri:any;
  sourceType:any;
  hist:any;
  toppuphist =[];
  constructor(
    private userService:AuthService,
    private driverService: DriverService,
    private camera:Camera,
    private platform:Platform,
    private filePath:FilePath,
    private actionSheetCtrl:ActionSheetController,
    private file: File,
    private ref: ChangeDetectorRef,
    private webview: WebView,
    private toastCtrl:ToastController
  ) { }

  async ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.res = await this.driverService.getCredit()
    if(this.res != null){
      if(this.res.data.driver_status==1){
        this.allowAccept = true
        this.userCredit = this.res.data.credit.credit
        this.userCreditNum = this.res.data.credit.creditnumber
      }else{
        this.allowAccept = false
      }
    }
    this.gethist();
  }

  gethist(){
    this.userService.apiGethistService('users/'+this.userInfo.user.id+'/account').then(res=>{
      this.toppuphist = [];
      let result:any = res ;
      this.hist = Object.assign([],result.data.accountdetails)
      console.log(this.hist)
      this.hist.forEach((obj) => {
        if(obj.status != null){
          console.log(obj.status)
          this.toppuphist.push(obj) ;
        }
      })
      console.log(this.toppuphist)
    })
  }

  loadStoredImages() {
    let image = localStorage.getItem(STORAGE_KEY)
    if (image) {
      let arr = JSON.parse(image);
      this.images = [];
      for (let img of arr) {
        let filePath = this.file.dataDirectory + img.name;
        let resPath = this.pathForImage(filePath);
        this.images.push({ name: img, path: resPath, filePath: filePath });
      }
    }
  }

  async addimage() {
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'ตัวเลือก',
      buttons: [{
        text: 'กล้อง',
        icon: 'camera',
        handler: () => {
          console.log('กล้อง');
          this.sourceType = this.camera.PictureSourceType.CAMERA;
          this.takePicture(this.sourceType);
        }
      }, {
        text: 'อัลบัม',
        icon: 'images',
        handler: () => {
          console.log('อัลบัม');
          this.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          this.takePicture(this.sourceType);
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
          this.imageFileUri = imagePath;
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(success =>{
                  let Path = this.file.dataDirectory+currentName;
                  let resPath = this.pathForImage(Path);
                  this.currentImage = resPath;
                  console.log(resPath)
                })
              });
      } else {
        this.imageFileUri = imagePath;
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(success =>{
          let Path = this.file.dataDirectory+currentName;
          let resPath = this.pathForImage(Path);
          this.currentImage = resPath;
          console.log(resPath)
        })
      }
    });
  }

  storeImage(imagePath){
    if (this.platform.is('android') && this.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            // this.uploadPhoto(imagePath);
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
  } else {
      // this.uploadPhoto(imagePath);
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
  }
  }
  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  async uploadPhoto() {
    this.currentImage = null
    this.storeImage(this.imageFileUri);
    window['resolveLocalFileSystemURL'](this.imageFileUri,
      entry => {
        entry['file'](file => this.readFile(file));
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
        formData.append('credit',this.credittopup);
        this.userService.uploadImageData(formData,'api/users/'+userId+'/account').then(async ()=>{
          this.gethist()
          // if(this.userType == 'driver'){
          //   this.router.navigateByUrl('tabs-controller/tabs/customerprofile')
          // }else{
          //   this.router.navigateByUrl('customertabs/ctabs/customerprofile')
          // }
        });
    };
    reader.readAsArrayBuffer(file);
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    });
  }

  updateStoredImages(name) {
    var d = new Date()
    let image = localStorage.getItem(STORAGE_KEY)
        let arr = JSON.parse(image);
        if (!arr) {
            let data = {
              credit:this.credittopup,
              date:d.getTime(),
              name:[name]
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } else {
            let data = {
              credit:this.credittopup,
              date:d.getTime(),
              name:name
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
 
        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);
 
        let newEntry = {
            name: name,
            path: resPath,
            filePath: filePath
        };
 
        this.images = [newEntry, ...this.images];
        this.ref.detectChanges(); // trigger change detection cycle
    
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
 
    let images = localStorage.getItem(STORAGE_KEY)
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
 
        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
          this.presentToast('File removed.');
    });  
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }


}
