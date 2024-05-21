import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private _Router: Router
  ) { }

  ngOnInit() {
  }

  GotoHome()
  {
    this._Router.navigate(['/home']);
  }

  GotoQRCode()
  {
    this._Router.navigate(['/qrcode']);
  }
}
