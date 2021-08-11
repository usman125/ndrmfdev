import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-ceo-actions',
  templateUrl: './ceo-actions.component.html',
  styleUrls: ['./ceo-actions.component.css'],
  providers: [ConfirmModelService]
})
export class CeoActionsComponent implements OnInit {
  complainData: any;
  dataOfComplainID: any;
  loading: Boolean;
  constructor(
    private userServices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,

  ) {
    this.complainData = JSON.parse(localStorage.getItem('complainToEdit'));
  }

  ngOnInit(): void {
    this.userServices.getComplaintById(this.complainData.complaintId).subscribe(
      res => {
        console.log("getcomplainbyId Data", res)
        this.dataOfComplainID = res
        console.log("data of complain id", this.dataOfComplainID)
      },
      _err => {
        var error = _err.json();
        console.log(error)
      }
    )
  }
  RejectAppeal() {
    this.loading = true,
      this.userServices.RejectAppeal(this.complainData.id).subscribe(
        res => {
          console.log("reject appeal result", res)
          const options = {
            title: 'Status has been updated',
            message: '',
            cancelText: 'CANCEL',
            confirmText: 'OK',
            add: true,
            confirm: false,
          };
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            this._router.navigate(['ceo']);
          })
        }
      )
  }
  ReAssignAppeal() {
    this.loading = true,
      this.userServices.ReAssignAppeal(this.complainData.id).subscribe(
        res => {
          console.log("ReAssign ppeal result", res)
          const options = {
            title: 'Status has been updated',
            message: '',
            cancelText: 'CANCEL',
            confirmText: 'OK',
            add: true,
            confirm: false,
          };
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            this._router.navigate(['ceo']);
          })
        }
      )
  }
}


