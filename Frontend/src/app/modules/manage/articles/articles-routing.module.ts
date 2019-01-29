import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { ArticlesComponent } from './articles.component';

const routes: Routes = [
  { 
    path: '', 
    component: ArticlesComponent,
    children: [
      { path: 'edit/:id', component: FormComponent },
      { path: 'create', component: FormComponent },
      { path: '', component: IndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
