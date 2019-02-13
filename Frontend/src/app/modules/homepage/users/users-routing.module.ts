import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SigninComponent } from './signin/signin.component';
import { RegistComponent } from './regist/regist.component';

const routes: Routes = [
  { 
    path: '',
    component: UsersComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'regist', component: RegistComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
