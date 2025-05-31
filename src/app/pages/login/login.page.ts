import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm : FormGroup;

	error_messages = {
		'email':[
      {type: 'required', message: 'Usuario requerido'},
      {type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
    ],
    'password':[
      {type: 'required', message: 'Contraseña requerida'},
      {type: 'minlength', message: 'Minimo 5 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'}
    ],
  }

  constructor(
    public nav: NavController,
    public server : ServiceService,
    public auth: AuthService,
    public _FormBuilder: FormBuilder,
  ) { 
    this.authForm = this._FormBuilder.group({
      email:  new FormControl ('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(60)])),
      password: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(5)])),
  	});
  }

  ngOnInit() {
   
  }


  loginDat()
  {
    this.auth.login(this.authForm.value).subscribe((request:any) => {

      if (request.msg != "OK") {
        this.server.presentToast(request.msg,"error");
      }else {
        // Todo OK
        localStorage.setItem('user_id',request.data.id);
        localStorage.setItem('user_full',JSON.stringify(request.data));
        localStorage.setItem('user_token',request.token);
        this.nav.navigateRoot('welcome');
      }   
    });
  }

  goToSignup()
  {
    this.nav.navigateForward('signup');
  }
}
