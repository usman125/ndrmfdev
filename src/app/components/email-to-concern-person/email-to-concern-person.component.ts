import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-email-to-concern-person',
  templateUrl: './email-to-concern-person.component.html',
  styleUrls: ['./email-to-concern-person.component.css']
})
export class EmailToConcernPersonComponent implements OnInit {
   body: any;
   subject: any;
  complainToedit: any;
  constructor(
    private userServices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
  }
EamiltoComplainant(){
  this.complainToedit = JSON.parse(localStorage.getItem('complainToEdit'));
this.userServices.emailToComplainant(this.complainToedit.id,this.body, this.subject).subscribe((result: any) => {
  console.log("caomplainant results", result);
  const options = {
    title: 'Successfully  added!',
    message: 'OK to exit',
    cancelText: 'CANCEL',
    confirmText: 'OK',
    add: true,
    confirm: false,
  };
  this._confirmModelService.open(options);
});
}
goBack() {
  this._router.navigate(['allcomplains']);
}
}
