import { KeysPipe } from './../../pipes/keys.pipe';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatTableModule, 
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatGridListModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { CKEditorModule } from 'ngx-ckeditor';
import { ConfirmDeleteComponent } from 'src/app/partials/manage/confirm-delete/confirm-delete.component';
import { LoadingComponent } from 'src/app/partials/manage/loading/loading.component';

@NgModule({
  declarations: [
    ConfirmDeleteComponent,
    LoadingComponent,
    KeysPipe
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule ,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    LoadingComponent,
    KeysPipe
  ]
})
export class MaterialModule { }
