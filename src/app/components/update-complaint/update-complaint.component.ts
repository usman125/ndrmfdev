import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcernedPersonDialogComponent } from './../concerned-person-dialog/concerned-person-dialog.component';

@Component({
  selector: 'app-update-complaint',
  templateUrl: './update-complaint.component.html',
  styleUrls: ['./update-complaint.component.css']
})
export class UpdateComplaintComponent implements OnInit {

   name: any;
   complaintId: any
  responseResults: any;;
  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    private _router: Router,
    private userServices: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConcernedPersonDialogComponent, {
      width: '320px',
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
   
    });
  }
}
