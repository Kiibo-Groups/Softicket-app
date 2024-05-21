import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  constructor(
    private _Router: Router
  ) {}

  ngOnInit() {
  }

  // Rutas y Redirecciones
  async GotoProfile()
  {
    this._Router.navigate(['/profile']);
  }

  GotoHome()
  {
    this._Router.navigate(['/home']);
  } 

}
