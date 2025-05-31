import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarantiesPage } from './garanties.page';

const routes: Routes = [
  {
    path: '',
    component: GarantiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarantiesPageRoutingModule {}
