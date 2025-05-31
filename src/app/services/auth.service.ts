import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { EventsService } from './events.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url = environment.ApiUrl;
  headersData: any = {
    'Content-Type': 'application/json',
    'Authorization': ''
	}
  constructor(
    private http: HttpClient, 
    private _EventsService: EventsService,
  ) { 
    
  }

  CloseSession()
  {	
    localStorage.setItem('user_id',"null");
    localStorage.setItem('user_dat',"null");
    localStorage.setItem('user_type',"null");
    localStorage.setItem('user_full', "null");
    localStorage.setItem('user_token', "null");
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_dat');
    localStorage.removeItem('user_type'); 
    localStorage.removeItem('user_full');
    localStorage.removeItem('user_token');

  }


   /**
   * Validacion de Usuario Logeado|Registrado
   * @returns
   */
   async chkLog(): Promise<any> {
    return new Promise((resolve, reject) => 
		{
      if (
        localStorage.getItem("user_id") &&
        localStorage.getItem("user_id") != null
      ) {
        this.chkUser({user_id: localStorage.getItem("user_id")}).subscribe((req: any) => {
          if (req.msg !== "not_exist") { 
            localStorage.setItem("user_id", req.user_id);  
            localStorage.setItem("user_dat", JSON.stringify(req.data));
            // Dispersamos la informacion 
            this._EventsService.publish("chkUser",req.data);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  chkUser(data: any) {
   	this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
		return this.http.post(this.url +'chkUser', data, { headers: this.headersData}).pipe(map(results => results));
  }

  /**
   * Inicio de sesion normal Usuario/Password
   * @param data 
   * @returns 
   */
  login(data:any)
  {
    return this.http.post(this.url+'login',data)
             .pipe(map(results => results));
  }

  logout()
  {
    this.headersData.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return this.http.post(this.url+'logout',[], { headers: this.headersData})
             .pipe(map(results => results));
  }
  
  /**
   * Inicio de sesion con SocialMedia Faceboook/Google
   * @param data 
   * @returns 
   */
  loginfb(data:any)
  {
    return this.http.post(this.url+'loginfb',data)
             .pipe(map(results => results));
  }

  loginGl(data:any)
  {
    return this.http.post(this.url+'loginGl',data)
             .pipe(map(results => results));
  }

  /**
   * Registro normal 
   * @param data 
   * @returns 
   */
  signup(data:any)
  {
    return this.http.post(this.url+'signup',data)
             .pipe(map(results => results));
  }

  /**
   * Registro con SocialMedia Facebook/Google
   * @param data 
   * @returns 
   */
  signupWithfb(data:any)
  {
    return this.http.get(data).pipe(map(results => results));
  }

  signupWithGl(data:any)
  {
    return this.http.get(data).pipe(map(results => results));
  }
  
  /**
   * Recuperacion de cuenta
   * @param data
   * @returns 
   */
  forgot(data:any)
  {
    return this.http.post(this.url+'forgot',data)
             .pipe(map(results => results));
  }

  verify(data:any)
  {
    return this.http.post(this.url+'verify',data)
             .pipe(map(results => results));
  }

  updatePassword(data:any)
  {
    return this.http.post(this.url+'updatePassword',data)
             .pipe(map(results => results));
  }
}
