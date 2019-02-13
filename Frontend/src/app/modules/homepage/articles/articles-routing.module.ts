import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { 
    path: '',
    component: ArticlesComponent,
    children: [
      { path: ':id', component: DetailComponent },
      { path: '', component: IndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
