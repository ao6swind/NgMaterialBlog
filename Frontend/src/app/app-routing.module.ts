import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'manage', loadChildren: './modules/manage/manage.module#ManageModule' },
  { path: '', loadChildren: './modules/homepage/homepage.module#HomepageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
