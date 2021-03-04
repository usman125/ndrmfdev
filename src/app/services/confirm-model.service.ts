import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/component-index';

@Injectable()
export class ConfirmModelService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options) {
    if (options.disableClose) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        add: options.add,
        confirm: options.confirm,
        startDate: options.startDate,
        endDate: options.endDate,
        setStatus: options.setStatus,
        assignToGm: options.assignToGm,
        setStages: options.setStages,
        offerLetter: options.offerLetter,
        disableClose: options.disableClose,
        selectThematic: options.selectThematic,
        areas: options.areas,
        markUnEligible: options.markUnEligible,
        markUnEligibleReason: options.markUnEligibleReason,
        taSelectionType: options.taSelectionType,
      };
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    } else {
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
          assignToGm: options.assignToGm,
          setStages: options.setStages,
          offerLetter: options.offerLetter,
          disableClose: options.disableClose,
          selectThematic: options.selectThematic,
          areas: options.areas,
          proposal_sections: options.proposal_sections,
          proposal_initmation: options.proposal_initmation,
          markUnEligible: options.markUnEligible,
          markUnEligibleReason: options.markUnEligibleReason,
          taSelectionType: options.taSelectionType,
        }
      });
    }
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