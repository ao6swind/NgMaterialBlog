import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  { 
    path: '',
    component: ManageComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'articles', loadChildren: './articles/articles.module#ArticlesModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
