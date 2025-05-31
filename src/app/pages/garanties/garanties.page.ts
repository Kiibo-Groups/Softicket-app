import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-garanties',
  templateUrl: './garanties.page.html',
  styleUrls: ['./garanties.page.scss'],
})
export class GarantiesPage implements OnInit {

  Products:any;
  userDat:any;
  constructor(
    public _ServiceService: ServiceService,
    public auth: AuthService,
    public _Platform: Platform,
    public _router: Router,
    public nav: NavController,
    private _EventsService: EventsService,
    private actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController
  ) { }


  ngOnInit() { 
    this._EventsService.subscribe("chkUser", (dat: any) => { 
      this.userDat = dat;
      console.log("chkUser", dat);
    });
  }

  ionViewWillEnter(){
    
    this._Platform.ready().then(() => {

      this.loadData();
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

  
  loadData()
  {
    console.log("validamos las garantias")
    // Carga los datos de la API
    this._ServiceService.checkWarranty({user_id: localStorage.getItem("user_id")}).subscribe((data:any) => {
      console.log(data);
      if (data.status == 200) {  
        this.Products = data.data;
      }
    });
  }


  goToHome() {
    this._router.navigate(['/home']);
  }
}
