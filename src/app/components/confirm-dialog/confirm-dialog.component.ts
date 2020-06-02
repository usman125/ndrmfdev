import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmData {
  cancelText: string;
  confirmText: string;
  message: string;
  title: string;
  add: boolean;
  setStatus: boolean;
  confirm: boolean;
  startDate: string;
  endDate: string;
  comments: string;
  assignToGm: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  checked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
    this.data.startDate = new Date().toISOString();
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close(value) {
    this.dialogRef.close(value);
  }

  confirm() {
    if (this.data.add) {
      this.close(true);
    } else if (this.data.confirm) {
      this.close({
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        comments: this.data.comments,
      });
    }
  }
  cancel() {
    this.close(false);
  }

  setStatus(status) {
    this.close({ status });

  }

  assignToGm(status) {
    this.close({ status });
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }


}
