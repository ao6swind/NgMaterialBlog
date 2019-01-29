import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'detail/:id', component: DetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
