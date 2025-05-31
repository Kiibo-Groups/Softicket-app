import { Component, OnInit } from '@angular/core';
import { ActionSheetController, CheckboxCustomEvent, LoadingController, NavController, Platform } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  myDate = new Date();

  canDismiss = false;
  presentingElement = null;

  Bills:any;
  userDat:any;
  constructor(
    public _ServiceService: ServiceService,
    public _Platform: Platform,
    public auth: AuthService,
    public _router: Router,
    private _EventsService: EventsService,
    private actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this._EventsService.subscribe("chkUser", (dat: any) => { 
      this.userDat = dat; 
      this.loadData();
    });
  }

  ionViewWillEnter(){
    
    this._Platform.ready().then(() => {

      /**
       * Podemos validar Login
       */
      this.auth.chkLog().then(async (req: any) => { 
        if (!req) {
          this._ServiceService.presentToast("Por favor Inicia sesión", "danger");
          this._router.navigate(['/login']);
        }
      });
    });
  }

  
  loadData()
  {
    // Carga los datos de la API
    this._ServiceService.getAllInvoices({user_id: this.userDat.id_sat}).subscribe((data:any) => {
      if (data.status == 200) {
        this.Bills = data.data.data; 
        console.log(this.myDate); 
      }
    });
  }

  changeDate(ev:any)
  {
    this.Bills = []; // Limpiamos....
    
    this._ServiceService.searchBillDate(this.myDate, this.userDat.id_sat).subscribe((data:any) => {
      console.log(data.data);
      if (data.data.length == 0) {
        this._ServiceService.presentToast("Sin elementos que mostrar","danger");        
      }else {
        this.Bills = data.data; 
      }
    });
  }


  async presentActionSheet(el:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona una opción', 
      buttons: [
        {
          text: 'Descargar PDF',
          icon: "cloud-download-outline",
          data: {
            action: 'download_pdf',
          },
        },
         {
          text: 'Descargar Xml',
          icon: "receipt-outline",
          data: {
            action: 'download_xml',
          },
        },
        {
          text: 'Descargar Zip', 
          icon: "reader-outline",
          data: {
            action: 'download_zip',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss(); 
    
    if (result.data) {
      switch (result.data.action) {
        case "download_pdf":
          this.RequirePDFBill(el.id)
          break;
        case "download_xml":
          this.RequireXMLBill(el.id)
          break;
        case "download_zip":
          this.RequireZIPBill(el.id)
          break;
      }
    }

  }


  RequirePDFBill(id:string)
  {
    window.open(this._ServiceService.url+"RequirePDFBill/"+id);
  }

  RequireXMLBill(id:string)
  {
    window.open(this._ServiceService.url+"RequireXMLBill/"+id);
  }

  RequireZIPBill(id:string)
  {
    window.open(this._ServiceService.url+"RequireZIPBill/"+id);
  }
 

  goToHome() {
    this._router.navigate(['/home']);
  }
}
