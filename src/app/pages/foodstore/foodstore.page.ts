import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../config/authservice';
import { FoodAddRemovePage } from "../../pages/food-add-remove/food-add-remove.page";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: 'app-foodstore',
  templateUrl: './foodstore.page.html',
  styleUrls: ['./foodstore.page.scss'],
})
export class FoodstorePage implements OnInit {
  callback:any;
  data: any;
  res_id: any;
  res_name: any;
  id: any;
  items: any;
  response: any;
  products = [];
  restaurants: any;
  description: any;
  cartLength = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    public http: HttpClient,
    public menuService: AuthService,
    public popoverCtrl: PopoverController,
    public cartService: CartService
    ){

    this.route.queryParams.subscribe(params => {
      if (params != null){
        this.res_id = params.restaurant_id;
        this.res_name = params.restaurant_name;
        this.callback = params.callback;
        this.goInRestaurant();
      }
    });
   }

  ngOnInit() {
    console.log('ionViewDidLoad FoodselectPage');
    this.cartLength = this.cartService.getCartLength();
  }

  ionViewWillEnter() {
    this.cartLength = Number(localStorage.getItem('cartLength'));
    console.log('foodstore :'+this.cartLength);
  }

  //service เรียกเมนูอาหาร เก็บข้อมูลลงใน products
  goInRestaurant() {

    this.menuService.apiGetService('restaurants/' + this.res_id + '/menus').then(result => {

      this.response = result;

      for (var i = 0; i < this.response.data.length; i++) {
        this.products.push({
          restaurant_name: this.res_name,
          restaurant_id: this.response.data[i].restaurant_id,
          id: this.response.data[i].id,
          name: this.response.data[i].name,
          price: this.response.data[i].price
        })
      }

    })

  }

  //เปิดหน้าตะกร้า
  openCart() {
    this.router.navigateByUrl('basket');
  }

  //เปิดป็อบอัพเลือกจำนวนอาหาร
  async selectFood(product) {
    //FoodAddRemovePage, product
    let popover = await this.popoverCtrl.create({
      component: FoodAddRemovePage ,
      componentProps: product,
      translucent: false
    });
    
    popover.present();
    popover.onDidDismiss().then(() => {
      this.cartLength = this.cartService.getCartLength();
      localStorage.setItem('cartLength',this.cartLength.toString())
    })  
  }

  ionViewDidLeave() {
    this.callback = this.cartService.getCartLength();
  }
}
