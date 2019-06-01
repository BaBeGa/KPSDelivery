import { Toast } from '@ionic-native/toast/ngx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/render3/util';
import { resolve } from 'q';

@Injectable()
export class AuthService {
  //this is the 2'nd backend
  apiDriverUrl = 'http://158.108.207.4:8080/kpsdelivery';
  apiUrl = 'http://158.108.207.4/delivery/public/';
  userToken: any;
  userInfo: any;

  constructor(public http: Http, public toastCtrl: Toast) {

  }

  postData(type, user) {

    return new Promise((resolve) => {
      let postData = new FormData();
      // postData.append('username', 'frontdriver@gmail.com');
      // postData.append('username', 'fronttest@gmail.com');
      // postData.append('password', '123456');
      postData.append('username', user.email);
      postData.append('password', user.password);
      postData.append('grant_type', 'password');
      postData.append('client_id', '2');
      postData.append('client_secret', 'tacNc9Ll4lUkD56JMhEKVpdQ9ZVxQCQMhCkPM1Yw');

      this.http.post(this.apiUrl + type, postData).pipe(map(res => res.json())).subscribe(data => {

        this.userToken = data;
        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ data.access_token);

        this.http.get(this.apiUrl + 'api/users', { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
          
          this.userInfo = data;
          localStorage.setItem('userToken', JSON.stringify(this.userToken.access_token));
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          resolve(data);

        })
      }, error => {
        this.toastCtrl.show(`Can't do authentication!`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
    })
  }

  apiRegister(user, type) {

    return new Promise((resolve) => {
      let postData = new FormData();
      postData.append('name', user.name);
      postData.append('email', user.email);
      postData.append('type', user.type);
      postData.append('password', user.password);
      postData.append('c_password', user.c_password);
      this.http.post(this.apiUrl + 'api/' + type, postData).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      }, error => {
        this.toastCtrl.show(`This email already use!`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        
      })
    })

  }

  apiGetService(type) {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/' + type).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      })
    })
  }

  apiGetDataService(type, headers) {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + 'api/' + type, { headers: headers }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      })
    })
  }

  apiPostService(type, post) {
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + 'api/' + type, post).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      })
    })
  }
  
  apiSyncUserType(){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.user.id;
    console.log('User ID : '+userId);
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    return new Promise((resolve) => {
      this.http.get(this.apiDriverUrl + '/user/'+userId, { headers: header }).pipe(map(res => res.json())).subscribe(data => {
        localStorage.setItem('userType', JSON.stringify(data.userType));
        console.log('UserType auth: '+data.userType);
        resolve(data);
      })
    })
  }
  //**********************************The 2'nd Backend start here!!!!******************************* */
  apiPatchUpdateUserFCM(type,body){
    var header = new Headers;
    var accessToken = localStorage.getItem('userToken');
    header.append('Content-Type','application/json');
    header.append('token',accessToken);
    return new Promise((resolve) => {
      this.http.patch(this.apiDriverUrl+type,body,{ headers:header }).pipe(map(res => res.json())).subscribe(data => {
        resolve(data);
      })
    })
  }

}
export class UpdateDataService extends AuthService{
  
    apiUpdateUser(userInfo){
      var header = new Headers;
      var accessToken = localStorage.getItem('userToken');
      header.append('Content-Type','application/json');
      header.append('token',accessToken);
      this.http.patch(this.apiDriverUrl+'updateUser',userInfo,{ headers:header}).pipe(map(res=>res.json())).subscribe(data=>{
        resolve(data);
      });
    }

}
export class CartService {

  cart = [];
  basket = [];
  totalCharge = 0;

  addProduct(product) {
    this.cart.push(product);
    this.arrangeProduct();
  }

  arrangeProduct() {

    let resultQty = [];
    let resultRt = [];

    //รวมจำนวนอาหารชนิดเดียวกัน
    this.cart.forEach(function (obj) {
      let i = 0;
      resultQty.forEach((aResult) => {
        if (obj.food_id == aResult.food_id) {
          aResult.food_qty = aResult.food_qty + obj.food_qty;
          return;
        } else if (i == resultQty.length - 1 || resultQty.length == 0) { resultQty.push(obj); }
        i++;
      })
      if (resultQty.length == 0) { resultQty.push(obj); }
    });

    //รวมอาหารร้านเดียวกัน
    resultQty.forEach(function (hash) {
      return function (a) {
        if (!hash[a.restaurant_name]) {
          hash[a.restaurant_name] = { restaurant_name: a.restaurant_name, restaurant_id: a.restaurant_id, products: [] };
          resultRt.push(hash[a.restaurant_name]);
        }
        hash[a.restaurant_name].products.push({ restaurant_id: a.restaurant_id, food_id: a.food_id, food_name: a.food_name, food_price: a.food_price, food_qty: a.food_qty });
      };
    }(Object.create(null)));

    this.cart = resultQty;
    this.basket = resultRt;
    this.totalCharge = 0;

    //รวมค่าอาหารทั้งหมด
    for (var i = 0; i < this.cart.length; i++) {
      this.totalCharge += this.cart[i].food_price * this.cart[i].food_qty;
    }

  }

  getBasket() {
    return this.basket;
  }

  getCart() {
    return this.cart;
  }

  getCartLength() {

    let cartLength = 0;

    for (var i = 0; i < this.cart.length; i++) {
      cartLength += this.cart[i].food_qty;
    }

    return cartLength;
  }

  getCharge() {
    return this.totalCharge;
  }

  removeProduct(product) {

    for (var i = 0; i < this.cart.length; i++) {
      if (product.food_id == this.cart[i].food_id) {
        this.cart.splice(i, 1);
      }
    }
    this.arrangeProduct();

  }

}

export interface User {

  name: string;
  email: string;
  type: string;
  password: string;
  c_password: string;
  newpass: string;
  cnewpass: string;
  cpassword: string;
  userToken: any;
  userInfo: any;

}

export interface userLogin {

  email: string;
  password: string;
}