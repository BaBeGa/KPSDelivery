import { ToastController, AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  //this is the 2'nd backend
  apiDriverUrl = 'http://158.108.207.4:8080/kpsdelivery';
  apiUrl = 'http://158.108.207.4/delivery/public/';
  userToken: any;
  userInfo: any;
  getToken: any;

  constructor(
    public http: Http, 
    public router: Router,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private loadingCtrl:LoadingController,
    private chttp:HttpClient
    ) {

  }

  async uploadImageData(formData: FormData,path) {
    this.getToken = await JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    let loading = await this.loadingCtrl.create({
      message: 'กำลังอัพโหลดภาพ...'
    });

    loading.present();
    await this.http.post(this.apiUrl+path, formData, { headers: headers })
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
        console.log(res)
          if (res.ok) {
              this.presentToast('อัพโหลดภาพเสร็จสมบูรณ์.')
              this.reloaduserInfo();
          } else {
              this.presentToast('อัพโหลดภาพพขัดข้อง.')
              loading.dismiss();
          }
      });
  }
  async reloaduserInfo(){
    this.getToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    await this.http.get(this.apiUrl + 'api/users', { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
      this.userInfo = data;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));   
    });
  }

  postData(type, user) {

    return new Promise((resolve) => {
      let postData = new FormData();
      postData.append('username', user.email);
      postData.append('password', user.password);
      postData.append('grant_type', 'password');
      postData.append('client_id', '2');
      postData.append('client_secret', 'tacNc9Ll4lUkD56JMhEKVpdQ9ZVxQCQMhCkPM1Yw');

      this.http.post(this.apiUrl + type, postData).pipe(map(res => res.json())).subscribe(data => {
        console.log('userToken: '+data);
        this.userToken = data;
        let headers = new Headers();
        console.log(data.access_token)
        headers.append('Authorization', 'Bearer '+ data.access_token);

        this.http.get(this.apiUrl + 'api/users', { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
          console.log('userInfo: '+data);
          this.userInfo = data;
          localStorage.setItem('userToken', JSON.stringify(this.userToken.access_token));
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          resolve(data);
        }, async err =>{
          console.log(err)
          let errhandle:any = err
          console.log(errhandle._body)
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            message: 'ข้อผิดพลาด '+errhandle.status,
            duration: 4000,
            position: 'bottom'
          });
          toast.present();
        })
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'รหัสผ่านไม่ถูกต้อง',
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
      })
    })
  }

  apiRegister(user, type) {

    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/' + type, user).pipe(map(res => res.json())).subscribe(data => {
        console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
      })
    })

  }

  apiGetService(type) {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/' + type).pipe(map(res => res.json())).subscribe(data => {
        console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  apiGethistService(type) {
    this.getToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/' + type, { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
        console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  apiGetDataService(type) {
    this.getToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/' + type, { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
        console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  async apiGetOrder(orderId){
    this.getToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/orders/' + orderId, { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
        //console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  apiPostService(type, post) {
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/' + type, post).pipe(map(res => res.json())).subscribe(data => {
        console.log(data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  async apiChangePassword(body){
    this.getToken = await JSON.parse(localStorage.getItem('userToken'));
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.user.id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/users/'+userId+'/changepassword', body, { headers: headers }).pipe(map((res:Response) => res.json())).subscribe(async data=> {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        if(1){
          const alert = await this.alertController.create({
            header: 'รหัสผ่านไม่ถูกต้อง',
            message: 'กรุณากรอกรหัสผ่านใหม่ แล้วลองใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  async apiGetCost(body){
    this.getToken = await JSON.parse(localStorage.getItem('userToken'));
    console.log(this.getToken);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise ( (resolve) => {
      this.http.post(this.apiUrl + 'api/startprice', body, { headers: headers }).pipe(map((res:Response) => res.json())).subscribe(async data=> {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
  }

  //new
  async apiPostDataService(type, post) {
    this.getToken = await JSON.parse(localStorage.getItem('userToken'));
    console.log(this.getToken);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/' + type, post, { headers: headers }).pipe(map((res:Response) => res.json())).subscribe(async data=> {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
          await alert.present();
        }else if(errhandle.status == 404){
          const alert = await this.alertController.create({
            header: 'ร้านค้าไม่พร้อมให้บริการ',
            message: 'กรุณาสั่งซื้ออีกครั้ง ภายหลัง',
            buttons: [
              {
                text: 'ตกลง',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
          await alert.present();
        }else{
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            message: 'ข้อผิดพลาด '+errhandle.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      })
    })
  }
  
  apiSyncUserType(){
    var header = new Headers;
    var accessToken = JSON.parse(localStorage.getItem('userToken'));
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.user.id;
    console.log('User ID : '+userId);
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    return new Promise((resolve) => {
      this.http.get(this.apiDriverUrl + '/user/'+userId, { headers: header }).pipe(map(res => res.json())).subscribe(data => {
        localStorage.setItem('userType', JSON.stringify(data.userType));
        localStorage.setItem('workStatus', JSON.stringify(data.workStatus));
        console.log('UserType auth: ',data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
  }
  //**********************************The 2'nd Backend start here!!!!******************************* */
  apiPatchUpdateUser(body){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    return new Promise((resolve) => {
      this.http.patch(this.apiDriverUrl+'/user',body,{ headers:header }).pipe(map(res => res.json())).subscribe(data => {
        this.reloaduserInfo();
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    });
  }

  apiGetFinddriver(orderId,limit){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    console.log(this.apiDriverUrl+'/'+orderId+'/'+limit);
    console.log('token : '+ accessToken);
    return new Promise((resolve) => {
      this.http.get(this.apiDriverUrl+'/finder/'+orderId+'/'+limit,{ headers:header }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
  }

  apiDriverOrder(orderId,body){
    this.getToken = JSON.parse(localStorage.getItem('userToken'));
    console.log(this.getToken);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken);

    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/orders/'+orderId,body, { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  async apiDriverCredit(){
    var header = new Headers;
    var accessToken = JSON.parse(localStorage.getItem('userToken'))
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.user.id;
    await header.append('Authorization', 'Bearer ' + accessToken);
    console.log('header : ',header);
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/users/'+userId+'/credit', { headers: header }).pipe(map(res => res.json())).subscribe(data => {
        console.log('UserCredit auth: ',data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        if(errhandle.status == 401){
          const alert = await this.alertController.create({
            header: 'Unauthorized',
            message: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                  await localStorage.clear();
                  this.router.navigateByUrl('login')
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
        if(errhandle.status == 500){
          const alert = await this.alertController.create({
            header: 'คุณยังไม่ได้ลงทะเบียนเพื่อเปิดใช้เครดิต',
            message: 'กรุณาติดต่อผู้ดูแลระบบองคุณเพื่อขอลงทะเบียนเครดิต',
            buttons: [
              {
                text: 'ตกลง',
                handler: async () => {
                  console.log('Confirm Okay');
                }
              },
              {
                text: 'ยกเลิก',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }
            ]
          });
      
          await alert.present();
        }
      })
    })
  }

  apiDriverAccept(body){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    console.log(body)
    return new Promise((resolve) => {
      this.http.post(this.apiDriverUrl+'/acception',body,{ headers:header }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        console.log(errhandle._body)
        if(errhandle.status == 403){
          const alert = await this.alertController.create({
            header: 'ไม่สามารถรับงานได้',
            message: 'คุณไม่สามารถรับงานนี้ได้เนื่องจาก มีผู้รับออเดอร์นี้ไปแล้ว.',
            buttons: ['ตกลง']
          });
      
          await alert.present();
        }else{
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            message: 'ข้อผิดพลาด '+errhandle.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }

      })
    })
  }

  apiDriverGetOrder(orderId){
    var header = new Headers;
    var accessToken = JSON.parse(localStorage.getItem('userToken'));
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    return new Promise((resolve) => {
      this.http.get(this.apiDriverUrl + '/order/'+orderId, { headers: header }).pipe(map(res => res.json())).subscribe(data => {
        //console.log('DriverOrder: ',data);
        resolve(data);
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
  }

  apiDriverGetHistory(){
    var header = new Headers;
    var accessToken = JSON.parse(localStorage.getItem('userToken'));
    header.append('Accept','application/json');
    header.append('Authorization', 'Bearer '+accessToken);
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/orders-drivers', { headers: header }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
        localStorage.setItem('userToken',JSON.parse(data.access_token))
      }, async err =>{
        console.log(err)
        let errhandle:any = err
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'ข้อผิดพลาด '+errhandle.status,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
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
export class UpdateDataService extends AuthService{
  
  apiUpdateUser(userInfo){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    this.http.patch(this.apiDriverUrl+'/updateUser',userInfo,{ headers:header}).pipe(map(res=>res.json())).subscribe(data=>{
    });
  }
}

export class UpdateOrderService extends AuthService{

}

export interface User {
  name: string;
  email: string;
  type: string;
  password: string;
  c_password: string;
  newpassword: string;
  c_newpassword: string;
  firstname: string;
  lastname: string;
  id_number: string;
  sex: string;
  dob: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  zipcode: string;
  phonenumber: string;
  lat_value: string;
  lon_value: string;

}

export interface userLogin {

  email: string;
  password: string;
}