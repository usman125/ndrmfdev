import { Component, OnInit } from '@angular/core';
import { ConcernedPersonDialogComponent } from './../concerned-person-dialog/concerned-person-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-grc',
  templateUrl: './grc.component.html',
  styleUrls: ['./grc.component.css']
})
export class GRCComponent implements OnInit {
  complains: any;
  logggedInUserData: any;
  priority: any;
  status: any;
  results: any;
  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    private userServices: UserService,
    public dialog: MatDialog
  ) {
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.userServices.getComplainantByUserId(this.logggedInUserData.userId).subscribe((result: any) => {
      console.log("GRC complainst", result);
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
