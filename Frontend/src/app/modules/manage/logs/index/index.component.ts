import { DataService } from 'src/app/service/data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  columns: string[] = ['User', 'Ip Address', 'Action', 'Target', 'Action Time', 'Detail'];
  dataSource: any;
  dataLength: number;
  isLoading: boolean = true;
  resource: string = "manage/logs";
  pageStart = 1;
  pageSize = environment.page.size;
  pageOptions = environment.page.options;

  constructor(private http: DataService) 
  { 
    this.reloadData();
  }

  ngOnInit() {
  }

  private reloadData(){
    this.isLoading = true;
    this.http.list(this.resource, this.pageStart, this.pageSize).subscribe(res => {  
      this.dataSource = res["logs"];
      this.dataLength = res["count"];
      this.isLoading = false;
    });
  }
}
