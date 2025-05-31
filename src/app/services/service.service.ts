import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { ModalController, ToastController } from '@ionic/angular';
import { EventsService } from './events.service';
import { environment } from '../../environments/environment.prod';
 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url:any;
	geoLatitude = null;
  geoLongitude=null;
  headersData: any = {
    'Content-Type': 'application/json',
    'Authorization': ''
	}
  constructor(
    private http: HttpClient, 
    private events: EventsService, 
    public modalController: ModalController,
    public toastController: ToastController,
  ) { 
    this.url = environment.ApiUrl; 
  }

  get windowRef() {
    return window
  }

    
  setLocalStorage()
  {	
    localStorage.setItem('user_id',"null");
    localStorage.removeItem('user_id');
    localStorage.setItem('admin',"null");
    localStorage.removeItem('admin');
    localStorage.setItem('app_text',"null");
    localStorage.removeItem('app_text');
  }
  
  homepage(city_id: any)
  {
    return this.http.get(this.url+'homepage/'+city_id)
             .pipe(map(results => results));
  }


  getData()
  {
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.get(this.url+'getDataInit',{ headers: this.headersData})
    .pipe(map(results => results));
  }

  getOffer(id:any)
  {
    return this.http.get(this.url+'getOffer/'+id)
             .pipe(map(results => results));
  }

  applyCoupen(id:any,cartNo:any)
  {
    return this.http.get(this.url+'applyCoupen/'+id+'/'+cartNo)
             .pipe(map(results => results));
  }

  async getGeolocation(){
    // LocationService.getMyLocation({enableHighAccuracy: true}).then((myLocation: MyLocation) => {
    //   let location = myLocation.latLng;
    //   this.geoLatitude = location.lat;
    //   this.geoLongitude = location.lng;  
      
    //   localStorage.setItem('current_lat',JSON.stringify(location.lat));
    //   localStorage.setItem('current_lng',JSON.stringify(location.lng));
    // });
  }
  
  GeocodeFromCoords(lat:any,lng:any,apikey:any)
  {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&region=MX&key="+apikey)
    .pipe(map(results => results)); 
  }

  GeocodeFromAddress(address:any,apikey:any)
  { 
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+apikey)
    .pipe(map(results => results)); 
  }
  
  /**
   * Obtencion de informacion de usuario
   * @param data 
   * @returns 
   */
  chkUser(data:any)
  {
    return this.http.post(this.url+'chkUser',data)
      .pipe(map(results => results));
  }

  userInfo(id:any)
  { 
    return this.http.get(this.url+'userinfo/'+id)
             .pipe(map(results => results));
  }

  /**
   * Actualizacion de informacion de perfil
   * @param data 
   * @param id 
   * @returns 
   */
  updateInfo(data:any,id:any)
  {
    
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'updateInfo/'+id,data, { headers: this.headersData})
             .pipe(map(results => results));
  }

  /**
   * Pagina de Sistema (Quienes somos, como trabajamos, etc.)
   * @returns 
   */
  pages()
  {
    return this.http.get(this.url+'pages?lid='+localStorage.getItem('lid')).pipe(
      map(results => results)
    );
  }

  /**
   * Creacion de pago Stripe
   * @param token 
   * @returns 
   */
  makeStripePayment(token:any)
  {
    return this.http.get(this.url+'makeStripePayment'+token).pipe(
      map(results => results)
    );
  }

  /**
   * Tickets/Recibos
   * @param user_id 
   */
  getAllTickets(data:any){
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'getAllTickets/',data, { headers: this.headersData})
             .pipe(map(results => results));
  }

  checkWarranty(data:any)
  {
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'checkWarranty/',data, { headers: this.headersData})
             .pipe(map(results => results));
  }
  
  RequirePDFOfTicket(id_bill:any)
  {
    return this.url+'RequirePDFOfTicket/'+id_bill;
  }

  InvoiceBill(data:any)
  {
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'InvoiceBill',data, { headers: this.headersData})
             .pipe(map(results => results));
  }

  getAllInvoices(data:any){
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'getAllInvoices/',data, { headers: this.headersData})
             .pipe(map(results => results));
  }

  searchBillDate(date:any, customer:any)
  {
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`; 
    return this.http.get(this.url+'searchBillDate/'+date+'/'+customer, { headers: this.headersData})
             .pipe(map(results => results));

  }

  /**
   * Toast de notificaciones
   * @param txt 
   * @param color 
   */
  async presentToast(txt:any,color:any) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:color
    });
    toast.present();
  }
}
