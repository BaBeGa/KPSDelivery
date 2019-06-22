import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/config/authservice";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  public onChangeForm: FormGroup;
  constructor(
    private userService: AuthService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ngOnit changePass');
    this.onChangeForm = this.formBuilder.group({
      'oldpassword': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'repassword': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async changePass(){
    let oldPass = this.onChangeForm.get('oldpassword').value;
    let newPass = this.onChangeForm.get('password').value;
    let rePass = this.onChangeForm.get('repassword').value;
    if(oldPass != null || newPass != null || rePass != null){
      if(this.onChangeForm.get('password').value != this.onChangeForm.get('repassword').value){
        const alert = await this.alertController.create({
          header: 'รหัสผ่านไม่ตรงกัน',
          message: 'โปรดกรอกรหัสผ่านใหม่ของคุณให้ตรงกัน.',
          buttons: ['ตกลง']
        });
        await alert.present();
      }else{
        let body = {
          old_password: oldPass,
          new_password: newPass
        }
        this.userService.apiChangePassword(body).then(async res=>{
          console.log(res)
          let result:any = res
          if(result.access_token != null){
            localStorage.setItem('userToken',JSON.stringify(result.access_token));
            const toast = await this.toastController.create({
              message: 'เปลี่ยนพาสเวิร์ดสำเร็จ.',
              duration: 3000
            });
            toast.present();
          }
        })
      }
    }
    // this.userService.apiChangePassword(oldPass,newPass).then(res=>{
    //   console.log(res);
    // })
  }

}
