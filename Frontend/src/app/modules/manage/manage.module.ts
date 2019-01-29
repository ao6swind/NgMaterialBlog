import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from 'src/app/partials/manage/header/header.component';
import { FooterComponent } from 'src/app/partials/manage/footer/footer.component';
import { NavComponent } from 'src/app/partials/manage/nav/nav.component';

@NgModule({
  declarations: [
    ManageComponent, 
    DashboardComponent, 
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
  ]
})
export class ManageModule { 

}
