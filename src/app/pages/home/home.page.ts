import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private _Router: Router
  ) {}


  // Rutas y Redirecciones
  async GotoProfile()
  {
    this._Router.navigate(['/profile']);
  }

  GotoQRCode()
  {
    this._Router.navigate(['/qrcode']);
  }

  GotoBills()
  {
    this._Router.navigate(['/bills']);
  }
}
