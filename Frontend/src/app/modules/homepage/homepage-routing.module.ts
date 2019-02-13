import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent,
    children: [
      { path: 'articles', loadChildren: 'src/app/modules/homepage/articles/articles.module#ArticlesModule' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
