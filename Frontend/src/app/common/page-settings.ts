import { environment } from '../../environments/environment';
import { DataService } from '../service/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/partials/manage/confirm-delete/confirm-delete.component';

/*********************************************************
 * 資料列表和頁碼功能的類別
 * 不曉得這樣設計好不好...
 * 因為
 * 1. 寫index.html時要用到<mat-paginator>的時候
 *    裡面的參數都必須從這邊撈，
 *    感覺工程師trace起來要爬滿久的，有點不直覺
 * 2. 後端webapi return的格式就只能固定成{ data: object[], count: number }
 *    不知道可不可以應付大多數的狀況
 *********************************************************/
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

    // =======================================================
    // 公開屬性
    // =======================================================
    public pageIndex: number        = 0; 
    public pageStart: number        = 1;
    public pageSize: number         = environment.page.size;
    public pageOptions: number[]    = environment.page.options;
    

    // =======================================================
    // 私有屬性
    // =======================================================
    private dataLength: number = 0;
    private dataSource: T[] = [];
    private isLoading: boolean = true;
    private snackBarSetting: {verticalPosition: any, horizontalPosition: any, duration: any} = {
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 3000
    };

    // =======================================================
    // 方法
    // =======================================================
    // 當<mat-paginator>發生改變的時候可以呼叫這條
    public onPageChange(event){
        this.pageIndex = event["pageIndex"];
        this.pageStart = event["pageIndex"] + 1;
        this.pageSize = event["pageSize"];
        this.reloadData();
    }
    
    // 當使用者按下刪除按鈕時
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
    
    // 取得是否正在載入資料
    public isDataLoading(){
        return this.isLoading;
    }

    // 取得資料
    public getDataSource(){
        return this.dataSource;
    }

    // 取得資料總筆數
    public getDataLength(){
        return this.dataLength;
    }

    // 向API請求資料
    private reloadData(){
        this.isLoading = true;
        this.http.list(this.resource, this.pageStart, this.pageSize).subscribe(res => {  
            this.dataSource = res["data"];
            this.dataLength = res["count"];
            this.isLoading = false;
        });
    }
}
