import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  public isLoading: boolean = false;
  public form: FormGroup;
  public user: User = new User();

  constructor
  (
    private fb: FormBuilder,
    private http: DataService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.http.post("homepage/users/regist", this.user).subscribe(res => {
      this.snackBar.open("Create Success!", null, {
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 3000
      });
      this.router.navigate(['manage']);
    });
  }
}
