import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from 'src/app/partials/homepage/header/header.component';
import { FooterComponent } from 'src/app/partials/homepage/footer/footer.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [
    HomepageComponent, 
    ListComponent, 
    DetailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    MaterialModule
  ]
})
export class HomepageModule { }
