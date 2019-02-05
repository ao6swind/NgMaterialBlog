import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { ArticlesComponent } from './articles.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ArticlesComponent, 
    IndexComponent, 
    FormComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule
  ]
})
export class ArticlesModule { }
