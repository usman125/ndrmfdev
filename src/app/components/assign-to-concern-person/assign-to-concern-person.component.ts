import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: "app-assign-to-concern-person",
  templateUrl: "./assign-to-concern-person.component.html",
  styleUrls: ["./assign-to-concern-person.component.css"],
})
export class AssignToConcernPersonComponent implements OnInit {
  allUsers: any;
  myDate = new Date().toISOString();
  userId: any;
  logggedInUserData: any;
  assigneePerson: any;
  date: Date;

  constructor(private userServices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
   ) {}

  ngOnInit(): void {
    this.userServices.getAllUsers().subscribe((result: any) => {
      console.log("allUsers", result);
      this.allUsers = result;
    });
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
    this.assigneePerson = JSON.parse(localStorage.getItem('complainToEdit'));
  }
  getUserId(id) {
    let userIds = [];
    console.log("userId", id);
    userIds.push(id);
    console.log("userIds", userIds);
  }
  ConfirmAssignToConcernedPerson() {

    let PostBody =
    [
      {
        "assignedDateTime":  this.myDate,
        "assignedPersonId": this.logggedInUserData.userId
      }
    ]

    console.log("postbody", PostBody)
    this.userServices.AssignComplainToConcernedPerson(this.assigneePerson.id, PostBody).subscribe((result: any) => {
      console.log("assigned", result);
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
