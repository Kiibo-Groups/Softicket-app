import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';


@Component({
  selector: 'app-wrap-header',
  templateUrl: './wrap-header.component.html',
  styleUrls: ['./wrap-header.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
})


export class WrapHeaderComponent  implements OnInit {

  @Input('pageInit') PageInit!: string;

  userDat: any = null;
  constructor(
    private _Router: Router,
    private _EventsService: EventsService,
  ) { 
    this._EventsService.subscribe("chkUser", (dat: any) => { 
      this.userDat = dat;
    });
  }

  ngOnInit() {
    console.log(this.PageInit)
  }

  // Rutas y Redirecciones
  async GotoProfile() {
    this._Router.navigate(['/profile']);
  }

  async GotoQRCode() {
    this._Router.navigate(['/qrcode']);
  }

}
