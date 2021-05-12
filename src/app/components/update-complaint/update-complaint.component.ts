import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcernedPersonDialogComponent } from './../concerned-person-dialog/concerned-person-dialog.component';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.css']
})
export class UpdateComplaintComponent implements OnInit {
  myDate = new Date().toISOString();
   name: any;
   complaintId: any
  responseResults: any;
  feedback: any;
  ceoId: any;
  loading: Boolean
  remarks: any;
  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    private _router: Router,
    private userServices: UserService,
    public dialog: MatDialog,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this.userServices.getUserListByRole().subscribe(
      res => {
      
        this.ceoId = res
        console.log("ceo id", this.ceoId[0].id)
      },
      _err => {
        var error = _err.json();
     console.log(error)
      }
    )
  }
  goBack() {
    this._router.navigate(['login']);
  }
  updateComplaint(){
   this.userServices.getComplaintById(this.complaintId).subscribe(
    res => {
  this.responseResults = res
console.log("response results", this.responseResults)
    },
    _err => {
      var error = _err.json();
   console.log(error)
    }
  )
  }
submitFeedback(){
  this.loading = true;
  if (!this.feedback){
    return 
  }
     let feedbackBody = {
      addedDateTime: this.myDate,
      complainantName: this.responseResults.complainantName,
      complaintId: this.complaintId,
      email: this.responseResults.email,
      feedback: this.feedback
     }
     this.userServices.submitFeedback(feedbackBody).subscribe(
      res => {
        const options = {
          title: 'Successfully  added!',
          message: 'OK to exit',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        this._router.navigate(['login']);
  console.log("feedback resp", res)
      },
      _err => {
        var error = _err.json();
     console.log(error)
      }
    )
}
UserAppeal(){
  this.loading = true
if(!this.remarks){
  return
}
  let appealBody = {
    appealDateTime: this.myDate,
    appealTo: this.ceoId[0].id,
    complaintId: this.complaintId,
    remarks: this.remarks,
    status: "INITIATED",
  }
  this.userServices.addComplaintAppeal(appealBody).subscribe(
    res => {
    console.log("appealbodyrespnse", res)
    const options = {
      title: 'Successfully  added!',
      message: 'OK to exit',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._confirmModelService.open(options);
    this._router.navigate(['login']);
    },
    _err => {
      var error = _err.json();
   console.log(error)
    }
  )
}
}
