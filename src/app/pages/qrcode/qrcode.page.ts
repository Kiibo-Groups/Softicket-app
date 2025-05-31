import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  userDat:any = null;
  constructor(
    private _Router: Router,
    public _Platform: Platform,
    public auth: AuthService,
    public _ServiceService: ServiceService,
    private _EventsService: EventsService,
  ) {}

  ngOnInit() {
    this._EventsService.subscribe("chkUser", (dat: any) => { 
      this.userDat = dat;
      console.log("chkUser", dat);
    });
  }

  
  ionViewWillEnter() {
    this._Platform.ready().then(() => { 
      /**
       * Podemos validar Login
       */
      this.auth.chkLog().then(async (req: any) => { 
        if (!req) {
          this._ServiceService.presentToast("Por favor Inicia sesión", "danger");
          this._Router.navigate(['/login']);
        }
      });
    });
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
