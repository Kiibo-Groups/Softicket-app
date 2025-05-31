import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// Componentes
import { TabsNavComponent } from '../../components/tabs-nav/tabs-nav.component';
import { WrapHeaderComponent } from '../../components/wrap-header/wrap-header.component'; 
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TabsNavComponent,
    WrapHeaderComponent
  ], 
  declarations: [HomePage]
})
export class HomePageModule {}
