import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  resource: string = "manage/articles";
  dataLength: number;
  dataSource: any;
  isLoading: boolean = true;
  pageStart = 1;
  pageSize = 10;
  pageOptions = [10, 20, 30];
  constructor(private http: DataService) { 
    this.reloadData();
  }

  ngOnInit() {
  }

  private reloadData(){
    this.isLoading = true;
    this.http.list(this.resource, this.pageStart, this.pageSize).subscribe(res => {  
      this.dataSource = res["articles"];
      this.dataLength = res["count"];
      this.isLoading = false;
    });
  }
}
