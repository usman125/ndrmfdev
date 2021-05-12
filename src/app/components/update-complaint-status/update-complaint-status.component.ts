import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-update-complaint-status',
  templateUrl: './update-complaint-status.component.html',
  styleUrls: ['./update-complaint-status.component.css']
})
export class UpdateComplaintStatusComponent implements OnInit {

  status: any;
  complainToedit: any;
  constructor(  private _router: Router,
    private userServices: UserService,
    private _confirmModelService: ConfirmModelService,) {
      this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
    }

  ngOnInit(): void {
  }
  updateComplaintStatus(){
    this.userServices.updateComplaintStatus(this.complainToedit.id, this.status).subscribe((result: any) => {
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
