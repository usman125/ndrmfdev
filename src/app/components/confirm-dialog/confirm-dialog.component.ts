import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

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
  setStages: boolean;
  offerLetter: boolean;
  disableClose: boolean;
  selectThematic: boolean;
  areas: any;
  proposal_sections: any;
  proposal_initmation: any;
  markUnEligible: any;
  markUnEligibleReason: any;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  checked: boolean = false;
  areas = new FormControl();
  proposalSections = new FormControl();
  applyAsJv = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
    this.data.startDate = new Date().toISOString();
  }

  ngOnInit() {
    // console.log("ALL THEMATIC AREAS:--", this.data.areas);
    // this.areas.patchValue(this.data.areas, { onlySelf: true });
  }

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
    this.close({ status, endDate: this.data.endDate, comments: this.data.markUnEligibleReason });

  }

  assignToGm(status) {
    this.close({ status });
  }

  uploadOfferLetter(status, endDate) {
    this.close({ status, endDate });
  }

  areaChanged($event) {
    console.log("AREA CHANGED:--", $event);
  }

  proposalSectionChanged($event) {
    console.log("PROPOSAL SECTION CHANGED:--", $event);
  }

  addThematicAreas() {
    this.close({
      areas: this.areas.value || [],
      status: 'ok',
      applyAsJv: this.applyAsJv.value
    })
  }

  proposalIntimation() {
    this.close({
      sections: this.proposalSections.value,
    })
  }

  closeMarkUnEligible() {
    this.close({
      commnets: this.data.markUnEligibleReason
    })
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }


}
