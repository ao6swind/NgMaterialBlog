import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRoutingModule } from './logs-routing.module';
import { MaterialModule } from './../../../shared/material/material.module';

import { LogsComponent } from './logs.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    LogsComponent, 
    IndexComponent, 
    DetailComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    MaterialModule
  ]
})
export class LogsModule { }
