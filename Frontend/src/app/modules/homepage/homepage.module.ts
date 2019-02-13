import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { HeaderComponent } from 'src/app/partials/homepage/header/header.component';
import { FooterComponent } from 'src/app/partials/homepage/footer/footer.component';


@NgModule({
  declarations: [
    HomepageComponent, 
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
