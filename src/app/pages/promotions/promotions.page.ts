import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  data:any;
  urlBack: any;
  pageView = 1;
  promos:any;
  constructor(
    public _ServiceService: ServiceService,
    private _Router: Router,
    public _Platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this._Platform.ready().then(() => {
      // Carga inicial de datos
      this.loadData();
    });
  }

  // Carga inicial de datos
  loadData()
  {
    // Carga los datos de la API
    this._ServiceService.getData().subscribe((data:any) => {
      if (data.data != "error") {
        this.urlBack = data.urlBack;
        this.data = data; 
      }
    });
  }

  viewPromos(store:any)
  {
    this.promos = store.promos;
    this.pageView = 2;
  }

  goToHome()
  {
    this.pageView = 1;
    // this._Router.navigate(['/home']);
  }
}
