import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionsPageRoutingModule } from './promotions-routing.module';
import { TabsNavComponent } from '../../components/tabs-nav/tabs-nav.component';

import { PromotionsPage } from './promotions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsNavComponent,
    PromotionsPageRoutingModule
  ],
  declarations: [PromotionsPage]
})
export class PromotionsPageModule {}
