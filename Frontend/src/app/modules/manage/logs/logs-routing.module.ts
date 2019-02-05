import { LogsComponent } from './logs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { 
    path: '', 
    component: LogsComponent,
    children: [
      { path: 'detail/:id', component: DetailComponent },
      { path: '', component: IndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
