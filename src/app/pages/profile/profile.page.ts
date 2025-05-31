import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';   
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userDat:any;
  name_view:boolean = false;
  email_view:boolean = false;
  phone_view:boolean = false;
  zip_view:boolean = false;
  rfc_view:boolean = false;
  regimen_view:boolean = false;
  constructor(
    public nav: NavController, 
    public auth: AuthService,
    private alertController: AlertController,
    private _Router: Router,
    private _Platform: Platform,
    private _ServiceService: ServiceService,
    private _EventsService: EventsService,
  ) { }

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
          this.nav.navigateRoot('/login');
        }
      });
    });
  }

  
  
  saveInfo()
  {
    this._ServiceService.updateInfo(this.userDat, localStorage.getItem('user_id')).subscribe((data:any) => { 
      console.log(data);
      
      if (data.data != 'error') { 
        this._ServiceService.presentToast("Información actualizada con exito.","success");
      }
    });
  }



  GotoHome()
  {
    this._Router.navigate(['/home']);
  }

  GotoQRCode()
  {
    this._Router.navigate(['/qrcode']);
  }

  Logout()
  { 
    this.auth.logout().subscribe((req:any) => {
      if (req.msg == "OK") {
        this.auth.CloseSession();
        this.nav.navigateRoot('/welcome');
      }else {
        this._ServiceService.presentToast("Ha ocurrido un problema.","error");
      }
    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro(a) que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this._ServiceService.presentToast("Sesión aún activa.","success");
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.Logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
