import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';  
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    public auth: AuthService,
    public server: ServiceService,
    private route: ActivatedRoute, 
    public nav: NavController,
  ) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter(){ 

    this.route.queryParams.subscribe( (params:any) => {
      /**
       * Podemos validar Login
       */
      this.auth.chkLog().then(async (req:any) => {
        if(req){
          if (params.redirect) { 
            this.RedirectPage(params.redirect);
          }else {
            this.server.presentToast('Bienvenido(a) de nuevo...','success');
            this.nav.navigateRoot('/home'); 
          }
        }else {
          this.nav.navigateRoot('/login');
        }
    
      });
    });
  }

  RedirectPage(page:any)
  {
    setTimeout(() => {
      this.nav.navigateRoot(page);
    }, 1500);
  } 
}
