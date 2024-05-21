import { Component, Input, OnInit,  Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router'; 
 
@Component({
  selector: 'app-tabs-nav',
  templateUrl: './tabs-nav.component.html',
  styleUrls: ['./tabs-nav.component.scss'],
  standalone: true,
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
})
export class TabsNavComponent  implements OnInit {
  @Input('pageInit') PageInit!: string;

  constructor(
    private _Router: Router
  ) { }

  ngOnInit() {
    console.log(this.PageInit)
  }

  GotoHome()
  {
    this._Router.navigate(['/home']);
  }

  GotoQRCode()
  {
    this._Router.navigate(['/qrcode']);
  }

  GotoBills()
  {
    this._Router.navigate(['/bills']);
  }
}
