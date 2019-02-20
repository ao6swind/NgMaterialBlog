import { environment } from '../../environments/environment';
import { DataService } from '../service/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/partials/manage/confirm-delete/confirm-delete.component';

export class PageSettings<T> {

    constructor(
        private resource: string,
        private http: DataService,
        private dialog?: MatDialog,
        private snackBar?: MatSnackBar
    ) 
    { 
        this.reloadData();
    }

    public pageIndex: number = 0;
    public pageStart: number = 1;
    public pageSize: number = environment.page.size;
    public pageOptions: number[] = environment.page.options;
    public dataLength: number = 0;
    public dataSource: T[];
    public isLoading: boolean = true;
    public snackBarSetting: {
        verticalPosition: any,
        horizontalPosition: any,
        duration: any
    } = {
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 3000
    }

    public onPageChange(event){
        this.pageIndex = event["pageIndex"];
        this.pageStart = event["pageIndex"] + 1;
        this.pageSize = event["pageSize"];
        this.reloadData();
    }
    
    public onDelete(id: number){
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);
        dialogRef.afterClosed().subscribe(isConfirmed => {
            if(isConfirmed){
                this.isLoading = true;
                this.http.delete(this.resource, id).subscribe(res => {
                this.snackBar.open("Delete success!", null, this.snackBarSetting);
                    this.reloadData();
                });
            }
        });
    }
    
    public reloadData(){
        this.isLoading = true;
        this.http.list(this.resource, this.pageStart, this.pageSize).subscribe(res => {  
            this.dataSource = res["data"];
            this.dataLength = res["count"];
            this.isLoading = false;
        });
    }
}
