import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private resource: string = "manage/logs";
  public isLoading: boolean = false;
  public log: Log = new Log();

  constructor(
    private http: DataService,
    private route: ActivatedRoute,
  ) { 
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.http.find(this.resource, params.id).subscribe((log: Log) => {
        this.log = log;
        this.isLoading = false;
      });
    });
  }

  ngOnInit() {
  }

}
