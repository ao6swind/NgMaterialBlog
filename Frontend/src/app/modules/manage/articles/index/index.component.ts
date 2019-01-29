import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { environment } from '../../../../../environments/environment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/partials/manage/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})


export class IndexComponent implements OnInit {
  columns: string[] = ['Title', 'Public Date', 'Created At', 'Updated At', 'Actions'];
  dataSource: any;
  dataLength: number;
  isLoading: boolean = true;
  resource: string = "manage/articles";
  pageStart = 1;
  pageSize = environment.page.size;
  pageOptions = environment.page.options;

  constructor
  (
    private http: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) 
  { 
    this.reloadData();
  }

  ngOnInit() {
  }

  onPageChange(event){
    this.pageSize = event["pageSize"];
    this.pageStart = event["pageIndex"] + 1;
    this.reloadData();
  }

  onDelete(id: number){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(isConfirmed => {
      if(isConfirmed){
        this.isLoading = true;
        this.http.delete(this.resource, id).subscribe(res => {
          this.snackBar.open("Delete success!", null, {
            verticalPosition: "top",
            horizontalPosition: "right",
            duration: 3000
          });
          this.reloadData();
        });
      }
    });
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
