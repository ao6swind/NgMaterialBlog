import { DataService } from 'src/app/service/data.service';
import { Component, OnInit } from '@angular/core';
import { PageSettings } from 'src/app/common/page-settings';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends PageSettings<Log> implements OnInit {
  columns: string[] = ['User', 'Ip Address', 'Action', 'Target', 'Action Time', 'Detail'];

  constructor
  (
    private dataService: DataService,
  ) 
  { 
    super("manage/logs", dataService);
  }

  ngOnInit() {
    
  }
}