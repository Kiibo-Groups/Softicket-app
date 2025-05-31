import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';   

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  authForm : FormGroup;

	error_messages = {
		'name':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Minimo 5 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
    ],
    'email':[
      {type: 'required', message: 'Email requerido'},
      {type: 'minlength', message: 'Minimo 3 caracteres'},
			{type: 'maxlength', message: 'Maximo 35 caracteres'},
    ],
    'phone':[
      {type: 'required', message: 'Telefono requerido'},
      {type: 'minlength', message: 'Minimo 10 caracteres'},
			{type: 'maxlength', message: 'Maximo 11 caracteres'},
    ],
    'rfc':[
      {type: 'required', message: 'RFC requerido'},
      {type: 'minlength', message: 'Minimo 13 caracteres'},
			{type: 'maxlength', message: 'Maximo 16 caracteres'},
    ],
    'FiscalRegime':[
      {type: 'required', message: 'Régimen fiscal: requerido'}
    ],
    'zip':[
      {type: 'required', message: 'Código postal: requerido'}
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
    public loadingController: LoadingController,
    public _FormBuilder: FormBuilder,
  ) { 
    this.authForm = this._FormBuilder.group({
      name: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(60)])),
      phone: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(11)])),
      rfc: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(16)])),
      FiscalRegime: new FormControl ('',Validators.compose([Validators.required])),
      zip: new FormControl ('',Validators.compose([Validators.required])),
      email:  new FormControl ('',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(60)])),
      password: new FormControl ('',Validators.compose([Validators.required,Validators.minLength(5)])),
  	});
  }

  ngOnInit() {
  }

  async loginDat()
  {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando cuenta',
      duration: 2000,
    });
    await loading.present();

    if (this.authForm.valid) {
      this.auth.signup(this.authForm.value).subscribe((request:any) => {
        console.log(request);
        loading.dismiss();

        if (request.msg != "OK") {
          this.server.presentToast(request.msg,"danger");
        }else {
          // Todo OK
          this.server.presentToast("Bienvenido(a) a Softicket.","success");
          localStorage.setItem('user_id',request.data.id);
          localStorage.setItem('user_full',JSON.stringify(request.data));
          localStorage.setItem('user_token',request.token);
          this.nav.navigateRoot('welcome');
        }   
      });   
    }else {
      this.server.presentToast("Por favor ingrese los campos correctamente","danger");
    }
  }

  goToLogin()
  {
    this.nav.navigateBack(['/login']);
  }
}
