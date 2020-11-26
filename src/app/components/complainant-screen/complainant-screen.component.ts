import { ConcernedPersonDialogComponent } from './../concerned-person-dialog/concerned-person-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  comments: any;
  date: any;
  userId: any
}


@Component({
  selector: 'app-complainant-screen',
  templateUrl: './complainant-screen.component.html',
  styleUrls: ['./complainant-screen.component.css']
})
export class ComplainantScreenComponent implements OnInit {
  complains: any;
  logggedInUserData: any;
  priority: any;
  status: any;
  results: any;
  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    private userServices: UserService,
    public dialog: MatDialog,
  ) {
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit(): void {
    this.userServices.getComplainantByUserId(this.logggedInUserData.userId).subscribe((result: any) => {
      console.log("complainant complains", result);
      this.complains = result;
    });
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConcernedPersonDialogComponent, {
      width: '320px',
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.results = result;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
