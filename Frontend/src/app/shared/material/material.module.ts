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

@NgModule({
  declarations: [
    ConfirmDeleteComponent
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
    MatSnackBarModule
  ]
})
export class MaterialModule { }
