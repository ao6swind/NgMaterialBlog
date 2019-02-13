import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ArticlesComponent, IndexComponent, DetailComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule
  ]
})
export class ArticlesModule { }
