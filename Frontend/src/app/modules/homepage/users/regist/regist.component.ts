import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

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
      name: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit() {
  }

  onSubmit(){

  }
}
