import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviedetailsPageRoutingModule } from './moviedetails-routing.module';

import { MoviedetailsPage } from './moviedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviedetailsPageRoutingModule
  ],
  declarations: [MoviedetailsPage]
})
export class MoviedetailsPageModule {}
