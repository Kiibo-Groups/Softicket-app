import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { TabsNavComponent } from '../../components/tabs-nav/tabs-nav.component';
import { WrapHeaderComponent } from '../../components/wrap-header/wrap-header.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TabsNavComponent,
    WrapHeaderComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
