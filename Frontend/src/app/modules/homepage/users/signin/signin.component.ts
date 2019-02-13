import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private resource: string = "homepage/users";
  public isLoading: boolean = false;
  public form: FormGroup;
  public user: User = new User();

  constructor
  (
    private fb: FormBuilder,
    private http: DataService,
  ) 
  { 
    this.form = this.fb.group({
      account: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    });
  }

  ngOnInit() {
  }

  onSubmit(){

  }
}