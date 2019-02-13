import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'manage', loadChildren: './modules/manage/manage.module#ManageModule', canActivate: [AuthGuard] },
  { path: 'homepage', loadChildren: './modules/homepage/homepage.module#HomepageModule' },
  { path: '', redirectTo: '/homepage/articles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
