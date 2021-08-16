import { Component, OnInit } from '@angular/core';
import { ConcernedPersonDialogComponent } from '../concerned-person-dialog/concerned-person-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evidence-and-reviews',
  templateUrl: './evidence-and-reviews.component.html',
  styleUrls: ['./evidence-and-reviews.component.css'],
  providers: [ConfirmModelService]
})
export class EvidenceAndReviewsComponent implements OnInit {
  results: any;
  complainToedit: any;
  logggedInUserData: any;
  addreview: any;

  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    public dialog: MatDialog,
    private _confirmModelService: ConfirmModelService,
    private _userServices: UserService,
    private _router: Router,
  ) {
    this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
    this.logggedInUserData = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {

  }

  openDialog(id): void {
    // const dialogRef = this.dialog.open(ConcernedPersonDialogComponent, {
    //   width: '320px',
    //   data: { id: id }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.results = result;
    // });
    // if (this.results) {
    //   this.dialogRef.close();
    // }
    const options = {
      title: 'Please remark and select the option!',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      evidanceId: id,
      evidanceFlag: true,
    };
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.callDialogData(confirmed.comments, id)
      }
    })

  }
  callDialogData(comments, id) {
    let statusBody = {
      "status": 'MARKED_TO_FOCAL_PERSON',
    }
    console.log("statusBody", statusBody.status)

    let postBody = {
      "comments": comments,
      "reviewAddBy": this.logggedInUserData.id,
      "reviewAddDateTime": new Date().toISOString(),
      "satisfied": false,
    }
    this._userServices.addreview(id, postBody).subscribe((result: any) => {
      console.log("addreview", result);
      this.addreview = result;
    });
    this._userServices.markInternaStatus(id).subscribe((result: any) => {
      console.log("internal status", result);
      const options = {
        title: 'Successfully  added!',
        message: 'OK to exit',
        cancelText: 'CANCEL',
        confirmText: 'OK',
        add: true,
        confirm: false,
      };
      this._confirmModelService.open(options);
      this._confirmModelService.confirmed().subscribe(confirmed => {
        this._router.navigate(['complainant']);
      })
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
