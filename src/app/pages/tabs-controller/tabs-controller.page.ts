import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs-controller',
  templateUrl: './tabs-controller.page.html',
  styleUrls: ['./tabs-controller.page.scss'],
})
export class TabsControllerPage implements OnInit {
  constructor(public router:Router) { }

  ngOnInit() {
  }
}


