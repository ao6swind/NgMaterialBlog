import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public isLoading: boolean = true;
  public article: Article = new Article();
  private resource: string = "homepage/articles";

  constructor
  (
    private http: DataService,
    private route: ActivatedRoute
  ) 
  { 
    this.route.params.subscribe(params => {
      this.http.find(this.resource, params.id).subscribe((article: Article) => {
        this.article = article;
        this.isLoading = false;
      });
    });
  }

  ngOnInit() {
  }

}
