import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddProjectDialogComponent } from '../components/component-index';

@Injectable()
export class AddProjectModelService {
  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<AddProjectDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(AddProjectDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed()
      .pipe(
        take(1), map(
          res => {
            return res;
          }
        )
      );
  }
}