import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-edit-complain',
  templateUrl: './edit-complain.component.html',
  styleUrls: ['./edit-complain.component.css']
})
export class EditComplainComponent implements OnInit {
  editComplainForm: FormGroup;
  complainToedit: any;
  priority: any;
  status: any;
  sequenceNumber: any;
  logggedInUserData: any;
  loading: Boolean;
  constructor(
    private _router: Router,
    private userServices: UserService,
    private _confirmModelService: ConfirmModelService,

    ) {

    this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
    console.log("status", this.status)
      if(this.status == undefined){
        this.status = "Initiated"
      }
  }

  ngOnInit(): void {

  }
SubmitEditComplain(){
  this.loading = true;
  let postBody = {
     "assignee": [
      {

        "userId": this.logggedInUserData.userId
       }
     ],
     "internalStatus": this.complainToedit.internalStatus,
     "priority": this.priority,
     "seqNo": this.sequenceNumber,
     "status": this.status
  }
console.log("PutBody", postBody)
this.userServices.acknowledgeComplaint(this.complainToedit.id, postBody).subscribe((result: any) => {

  console.log("Acknowledge results", result);
  const options = {
    title: 'Successfully  added!',
    message: 'OK to exit',
    cancelText: 'CANCEL',
    confirmText: 'OK',
    add: true,
    confirm: false,
  };
  this._confirmModelService.open(options);
  this._router.navigate(['allcomplains']);
});

}
  goBack() {
    this._router.navigate(['allcomplains']);
  }
}
