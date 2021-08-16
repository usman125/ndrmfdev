import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-email-to-concern-person',
  templateUrl: './email-to-concern-person.component.html',
  styleUrls: ['./email-to-concern-person.component.css'],
  providers: [ConfirmModelService]
})
export class EmailToConcernPersonComponent implements OnInit {
  body: any;
  subject: any;
  complainToedit: any;
  loading: Boolean;
  constructor(
    private userServices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }
  EamiltoComplainant() {
    this.loading = true;
    this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
    this.userServices.emailToComplainant(this.complainToedit.id, this.body, this.subject).subscribe((result: any) => {
      console.log("email complainant results", result);
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
        this._router.navigate(['allcomplains']);
      });
    });
  }
  goBack() {
    this._router.navigate(['allcomplains']);
  }
}
