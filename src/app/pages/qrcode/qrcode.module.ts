import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodePageRoutingModule } from './qrcode-routing.module';
import { TabsNavComponent } from '../../components/tabs-nav/tabs-nav.component';
import { QrcodePage } from './qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodePageRoutingModule,
    TabsNavComponent
  ],
  declarations: [QrcodePage]
})
export class QrcodePageModule {}
