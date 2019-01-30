import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private resource: string = "manage/articles";
  private isCreateMode: boolean = true;
  public isLoading: boolean = false;
  public form: FormGroup;
  public article: Article = new Article();

  constructor(
    private fb: FormBuilder,
    private http: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) 
  {

    if(this.route.routeConfig.path != "create")
    {
      this.isCreateMode = false;
      this.isLoading = true;
      this.route.params.subscribe(params => {
        this.http.find(this.resource, params.id).subscribe((article: Article) => {
          this.article = article;
          this.isLoading = false;
        });
      });
    }
    this.form = this.fb.group({
      title: [ null, [ Validators.required ] ],
      publicDate: [ null, [ Validators.required ] ],
      content: [ null ]
    });
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.isLoading = true;
    switch(this.isCreateMode)
    {
      case true:
        this.http.create(this.resource, this.article).subscribe(res => {
          this.snackBar.open("Create Success!", null, {
            verticalPosition: "top",
            horizontalPosition: "right",
            duration: 3000
          });
          this.router.navigate([this.resource]);
        });
        break;
      case false:
        this.http.update(this.resource, this.article.id, this.article).subscribe(res => {
          this.snackBar.open("Update Success!", null, {
            verticalPosition: "top",
            horizontalPosition: "right",
            duration: 3000
          });
          this.router.navigate([this.resource]);
        });
        break;
    }
  }
}
