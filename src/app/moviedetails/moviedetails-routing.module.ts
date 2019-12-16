import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviedetailsPage } from './moviedetails.page';

const routes: Routes = [
  {
    path: '',
    component: MoviedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviedetailsPageRoutingModule {}
