import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService, CartService } from 'src/app/config/authservice';
@Component({
  selector: 'app-foodcenter',
  templateUrl: './foodcenter.page.html',
  styleUrls: ['./foodcenter.page.scss'],
})
export class FoodcenterPage implements OnInit {

  constructor(public navCtrl: NavController,
     public inAppService: AuthService,
     public cartService: CartService,
     private router:Router,
     ){ }

  id: string;
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;
  items2: any;
  checkGetData: boolean = false;
  response: any;
  cartLength = 0;
  restaurantNum = 0;
  userInfo:any;

  ngOnInit() {
    console.log('FoodCenter :'+localStorage.getItem('FCMToken'));
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(this.userInfo!=null){
      this.saveTokenToBackend(localStorage.getItem('FCMToken'));
    }
    console.log('ionViewDidLoad FoodcenterPage');
    //console.log(localStorage.getItem('FCMToken'));
  }

  async saveTokenToBackend(token) {
    let userID = this.userInfo.user.id;
    //console.log(userID);
    let body = { 
      id: userID,
      fcmToken: token
    }
    //console.log(body);
    await this.inAppService.apiPatchUpdateUserFCM('/user',body).then((result)=>{
      console.log('Save FCM_token status : ', result);
      return result;
    }).catch(err => console.log(err));
  }

  ionViewWillEnter() {
    this.cartLength = this.cartService.getCartLength();
    this.getRestaurant();

    if (this.checkGetData == true) {
      this.setFilteredItems();
      this.checkGetData = false;
    }

    this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });

  }

  //service เรียกร้านค้า
  getRestaurant() {

    this.inAppService.apiGetService('restaurants').then(result => {

      this.response = result;
      this.items = this.response.data;
      this.restaurantNum = this.response.data.length;

      let sortedStore = this.items.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        else if (b.name.toUpperCase() > a.name.toUpperCase()) return -1;
        else return 0;
      });

      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].is_active == 0) {
          this.items[i].status = 'ร้านปิด';
        }
        else {
          this.items[i].status = 'ร้านเปิด';
        }
      }

      this.items2 = this.items;
      this.checkGetData = true;

    })

  }

  goInRestaurant(id, name) {
    let navigationExtras: NavigationExtras = {
      state: {
        restaurant_id: id,
        restaurant_name: name
      }
    };
    this.router.navigateByUrl('foodstore', navigationExtras );
  }

  promo1() {
    console.log("promo1 Clicked");
  }

  doFoodStore() {

  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.items2.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  openCart() {
    this.router.navigateByUrl('basket');
  }

  category(keyword) {

    let postData = new FormData();
    postData.append('search', keyword);

    this.inAppService.apiPostService('categories', postData).then((res: any) => {

      var result = res.data;
      this.items = [];
      this.restaurantNum = result.length;

      for (var i = 0; i < result.length; i++) {
        console.log(result[i].id);

        this.inAppService.apiGetService('restaurants/' + result[i].id).then(result => {

          this.response = result;
          if (this.response.data.is_active == 0) {
            this.response.data.status = 'ร้านปิด';
          }
          else {
            this.response.data.status = 'ร้านเปิด';
          }
          this.items.push(this.response.data);
          
        })
      }
      console.log(this.items);

    })
  }

}
