import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/component-index';

@Injectable()
export class ConfirmModelService {
  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        add: options.add,
        confirm: options.confirm,
        startDate: options.startDate,
        endDate: options.endDate,
        setStatus: options.setStatus,
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