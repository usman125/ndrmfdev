import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-concerned-person-dialog',
  templateUrl: './concerned-person-dialog.component.html',
  styleUrls: ['./concerned-person-dialog.component.css']
})
export class ConcernedPersonDialogComponent implements OnInit {
  myDate = new Date().toISOString();
  coments: any
  logggedInUserData: any;
  addreview: any;
  apiLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    console.log("dialogData", this.data.id)
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
  }
   callDialogData(){
let statusBody = {
  "status": 'MARKED_TO_FOCAL_PERSON',
}
console.log("statusBody", statusBody.status)

    let postBody = {
      "comments": this.coments,
      "reviewAddBy":this.logggedInUserData.userId,
      "reviewAddDateTime": this.myDate,
      "satisfied": false,
    }
     console.log("dialogPostBody", postBody)
     this.userservices.addreview(this.data.id, postBody ).subscribe((result: any) => {
      console.log("addreview", result);
      this.addreview = result;
    });
    this.userservices.markInternaStatus(this.data.id).subscribe((result: any) => {
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
      this._router.navigate(['complainant']);
    }
    );

   }

}
