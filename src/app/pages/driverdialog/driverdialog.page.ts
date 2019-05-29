import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-driverdialog',
  templateUrl: './driverdialog.page.html',
  styleUrls: ['./driverdialog.page.scss'],
})
export class DriverdialogPage implements OnInit {
  data: any;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      console.log('Order Details',this.data);
    }
  }

}
