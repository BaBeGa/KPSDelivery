import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService, CartService } from '../../config/authservice';

@Component({
  selector: 'app-foodstore',
  templateUrl: './foodstore.page.html',
  styleUrls: ['./foodstore.page.scss'],
})
export class FoodstorePage implements OnInit {
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
    public navParams: NavParams,
    public http: HttpClient,
    public menuService: AuthService,
    public popoverCtrl: PopoverController,
    public cartService: CartService
    ){

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state;
      }
    });
    this.res_id = this.data.restaurant_id;
    this.res_name = this.data.restaurant_name;
    this.goInRestaurant();

   }

  ngOnInit() {
    console.log('ionViewDidLoad FoodselectPage');
  }

  ionViewWillEnter() {
    this.cartLength = this.cartService.getCartLength();
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
      component: 'food-add-remove',
      event: product,
      translucent: false
    });
    
    popover.present();
    popover.onDidDismiss().then(() => {
      this.cartLength = this.cartService.getCartLength();
    })  
  }
}
