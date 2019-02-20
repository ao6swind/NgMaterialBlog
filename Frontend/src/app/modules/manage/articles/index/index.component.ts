import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { MatDialog, MatSnackBar } from '@angular/material';

import { PageSettings } from 'src/app/common/page-settings';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})


export class IndexComponent extends PageSettings<Article> implements OnInit {
  columns: string[] = ['Title', 'Public Date', 'Created At', 'Updated At', 'Actions'];

  constructor
  (
    private dataService: DataService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) 
  { 
    super("manage/articles", dataService, matDialog, matSnackBar);
  }

  ngOnInit() {
    
  }
}
