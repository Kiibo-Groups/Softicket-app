import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  Bills:any;
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
    // Carga los datos de la API
    this._ServiceService.getAllTickets({user_id: localStorage.getItem("user_id")}).subscribe((data:any) => {
      if (data.status == 200) {
        this.Bills = data.data; 
        console.log(this.Bills);
      }
    });
  }

  async presentActionSheet(el:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona una opción', 
      buttons: [
        {
          text: 'Solicitar Factura',
          icon: "cloud-download-outline",
          data: {
            action: 'invoice',
          },
        },
         {
          text: 'Ver Recibo',
          icon: "receipt-outline",
          data: {
            action: 'view_ticket',
          },
        },
        {
          text: 'Factura externa', 
          icon: "reader-outline",
          data: {
            action: 'invoice_external',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss(); 

    if (result.data) {
      switch (result.data.action) {
        case "view_ticket":
          this.RequirePDFOfTicket(el.external_id)
          break;
        case "invoice":
          this.InvoiceBill(el.external_id, this.userDat.id_sat);
          break;
        case "invoice_external":
          window.open(el.self_invoice_url); 
          break;
      }
    }

  }


  RequirePDFOfTicket(id:string)
  {
    window.open(this._ServiceService.url+"RequirePDFOfTicket/"+id);
  }

  async InvoiceBill(id_bill:string, id_customer:string)
  {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Generando Factura',
      duration: 2000,
    });
    await loading.present();

    this._ServiceService.InvoiceBill({id_bill: id_bill, id_customer: id_customer}).subscribe((req:any) => {
      loading.dismiss();
      if (req.status == 202) {
        this._ServiceService.presentToast(req.msg,"danger");
      }else {
        this._ServiceService.presentToast("Factura Generada Correctamente...","success");
        this.loadData();
        this.ViewInvoicePDF(req.data.id);
      }
    });
  }

  ViewInvoicePDF(id:string)
  {
    window.open(this._ServiceService.url+"ViewInvoicePDF/"+id);
  }

  goToHome() {
    this._router.navigate(['/home']);
  }
}
