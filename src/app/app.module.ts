import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsNavComponent } from './components/tabs-nav/tabs-nav.component';
import { WrapHeaderComponent } from './components/wrap-header/wrap-header.component';
 
 
@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    bootstrap: [AppComponent], 
    imports: [
        CommonModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TabsNavComponent,
        WrapHeaderComponent,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ], 
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }] })
export class AppModule {}
