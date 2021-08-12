import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-grc-actions',
  templateUrl: './grc-actions.component.html',
  styleUrls: ['./grc-actions.component.css'],
  providers: [ConfirmModelService]
})
export class GrcActionsComponent implements OnInit {
  complain: any;
  loading: Boolean;
  coments: any;
  myDate = new Date().toISOString();
  logggedInUserData: any;
  addreview: any;
  constructor(
    private userservices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
  ) {
    this.complain = JSON.parse(localStorage.getItem('complainToEdit'));
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }
  satisfiedGrc() {

    if (!this.coments) {
      return
    }
    this.loading = true;

    let postBody = {
      "comments": this.coments,
      "reviewAddBy": this.logggedInUserData.id,
      "reviewAddDateTime": this.myDate,
      "satisfied": true,
    }

    this.userservices.addreview(this.complain.id, postBody).subscribe((result: any) => {
      console.log("addreview", result);
      this.addreview = result;
    });
    this.userservices.markInternaStatus(this.complain.id).subscribe((result: any) => {
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
        this._router.navigate(['grc']);
      })
    }
    );
  }

  NotsatisfiedGrc() {

    if (!this.coments) {
      return
    }
    this.loading = true;

    let postBody = {
      "comments": this.coments,
      "reviewAddBy": this.logggedInUserData.id,
      "reviewAddDateTime": this.myDate,
      "satisfied": false,
    }

    this.userservices.addreview(this.complain.id, postBody).subscribe((result: any) => {
      console.log("addreview", result);
      this.addreview = result;
    });
    this.userservices.markInternaStatus(this.complain.id).subscribe((result: any) => {
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
        this._router.navigate(['grc']);
      })
    }
    );
  }
}
