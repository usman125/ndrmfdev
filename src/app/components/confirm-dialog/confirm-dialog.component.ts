import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';

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
  taSelectionType: any;
  enableGia: any;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  checked: boolean = false;
  areas = new FormControl();
  proposalSections = new FormControl();
  applyAsJv = new FormControl();
  jvUsers = new FormControl();
  allJvUsers: any = [];
  showJvUsers: boolean = false;

  Subscription: Subscription = new Subscription();
  selectedProject: any = null;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _userService: UserService) {
    this.data.startDate = new Date().toISOString();
  }

  ngOnInit() {
    // console.log("ALL THEMATIC AREAS:--", this.data.areas);
    // this.areas.patchValue(this.data.areas, { onlySelf: true });
    this._primaryAppraisalFormsStore.state$.subscribe((data) => {
      this.selectedProject = data.selectedProject;
    })
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
    this.close({
      status,
      endDate: this.data.endDate,
      comments: this.data.markUnEligibleReason
    });

  }

  enableGia(status) {
    this.close({
      status,
      enableGia: true,
    });
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
      jvUser: this.jvUsers.value ? this.jvUsers.value : null,
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
      this.jvUsers.setValidators([Validators.required]);
      this.showJvUsers = true;
      // this._userService.getAllJvUsers().subscribe(
      //   (result: any) => {
      //     console.log("ALL JV USERS:--", result);
      //     this.allJvUsers = result;
      //     this.showJvUsers = true;
      //     this.jvUsers.setValidators([Validators.required]);
      //   },
      //   (error: any) => {
      //     console.log("ALL JV USERS:--", error);
      //   }
      // );
    } else {
      this.jvUsers.reset();
      this.jvUsers.clearValidators();
      this.showJvUsers = false;
    }
  }

  jvUsersChanged($event) {
    console.log("JV USERS CHANGED:--", $event);
  }

  checkAreasInfo() {
    for (let i = 0; i < this.areas.value.length; i++) {
      let key = this.areas.value[i];
      if ((!key.counterpart && !key.experience) || (key.counterpart === null &&
        key.experience === null) || (key.counterpart !== null &&
          key.experience === null) || (key.counterpart === null &&
            key.experience !== null) || (!key.counterpart &&
              key.experience === null) || (key.counterpart === null &&
                !key.experience)) {
        return true;
      }
    }
    return false;
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
