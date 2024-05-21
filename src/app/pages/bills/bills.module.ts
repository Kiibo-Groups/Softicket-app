import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsPageRoutingModule } from './bills-routing.module';
import { TabsNavComponent } from '../../components/tabs-nav/tabs-nav.component';
import { BillsPage } from './bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsPageRoutingModule,
    TabsNavComponent
  ],
  declarations: [BillsPage]
})
export class BillsPageModule {}
