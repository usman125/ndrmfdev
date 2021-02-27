import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
  jvUsers = new FormControl();
  allJvUsers: any = [];
  showJvUsers: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData,
    private _userService: UserService) {
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

  uploadOfferLetter(status, endDate, comments) {
    this.close({ status, endDate, comments });
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
      applyAsJv: this.applyAsJv.value,
      jvUserId: this.jvUsers.value.id,
    })
  }

  proposalIntimation() {
    this.close({
      sections: this.proposalSections.value,
    })
  }

  closeMarkUnEligible() {
    this.close({
      comments: this.data.markUnEligibleReason
    })
  }

  asvailableAsJvChanged($event) {
    console.log("Available AS JV USERS CHANGED:--", $event);
    if ($event.checked) {
      this._userService.getAllJvUsers().subscribe(
        (result: any) => {
          console.log("ALL JV USERS:--", result);
          this.allJvUsers = result;
          this.showJvUsers = true;
          this.jvUsers.setValidators([Validators.required]);
        },
        (error: any) => {
          console.log("ALL JV USERS:--", error);
        }
      );
    } else {
      this.jvUsers.reset();
      this.jvUsers.clearValidators();
      this.showJvUsers = false;
    }
  }

  jvUsersChanged($event) {
    console.log("JV USERS CHANGED:--", $event);
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }


}
