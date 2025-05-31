import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  data: any;
  userDat: any;
  constructor(
    public _ServiceService: ServiceService,
    private auth: AuthService,
    private nav: NavController,
    private _Router: Router,
    public _Platform: Platform
  ) {

    
  }


  ionViewWillEnter() {
    this._Platform.ready().then(() => { 
      /**
       * Podemos validar Login
       */
      this.auth.chkLog().then(async (req: any) => { 
        if (!req) {
          this._ServiceService.presentToast("Por favor Inicia sesión", "danger");
          this.nav.navigateRoot('/login');
        } else {
          // Carga inicial de datos
          this.loadData();
        }
      });
    });
  }

  // Carga inicial de datos
  loadData() {
    // Carga los datos de la API
    this._ServiceService.getData().subscribe(data => {
      this.data = data;
    });
  }


  // Rutas y Redirecciones
  async GotoProfile() {
    this._Router.navigate(['/profile']);
  }

  GotoQRCode() {
    this._Router.navigate(['/qrcode']);
  }

  GotoBills() {
    this._Router.navigate(['/bills']);
  }

  GotoPromotions() {
    this._Router.navigate(['/promotions']);
  }

  GotoTickets() {
    this._Router.navigate(['/tickets']);
  }

  GotoGaranties() {
    this._Router.navigate(['/garanties']);
  }
}
