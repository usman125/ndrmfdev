import { Component, OnInit } from '@angular/core';
import { ConcernedPersonDialogComponent } from '../concerned-person-dialog/concerned-person-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-evidence-and-reviews',
  templateUrl: './evidence-and-reviews.component.html',
  styleUrls: ['./evidence-and-reviews.component.css']
})
export class EvidenceAndReviewsComponent implements OnInit {
  results: any;
  complain: any;

  constructor(
    public dialogRef: MatDialogRef<ConcernedPersonDialogComponent>,
    public dialog: MatDialog
  ) { 
    this.complain = JSON.parse(localStorage.getItem('complainToEdit'));
  }

  ngOnInit(): void {

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
    if(this.results){
      this.dialogRef.close();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
