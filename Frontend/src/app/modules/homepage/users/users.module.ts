import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

import { UsersComponent } from './users.component';
import { RegistComponent } from './regist/regist.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [UsersComponent, RegistComponent, SigninComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
