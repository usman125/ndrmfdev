import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: "app-assign-to-concern-person",
  templateUrl: "./assign-to-concern-person.component.html",
  styleUrls: ["./assign-to-concern-person.component.css"],
  providers: [ConfirmModelService]
})
export class AssignToConcernPersonComponent implements OnInit {
  allUsers: any;
  allDepUsers: any;
  myDate = new Date().toISOString();
  userId: any;
  logggedInUserData: any;
  assigneePerson: any;
  date: Date;
  assignedPersonIds = [];
  loading: Boolean;
  constructor(private userServices: UserService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // this.userServices.getAllUsers().subscribe((result: any) => {
    //   console.log("allUsers", result);
    //   this.allUsers = result;
    // });

    this.userServices.getAllDepartmentUsers().subscribe((result: any) => {
      console.log("allDepUsers", result);
      this.allDepUsers = result;
    });

    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
    this.assigneePerson = JSON.parse(localStorage.getItem('complainToEdit'));
  }

  getUserId(id) {
    let previousUserID = id
    this.assignedPersonIds.push(
      {
        "assignedDateTime": this.myDate,
        "assignedPersonId": previousUserID
      }
    );
    console.log("ASSIGNEEE PERSON IDS:---", this.assignedPersonIds);

  }
  ConfirmAssignToConcernedPerson() {
    this.loading = true;
    this.userServices.AssignComplainToConcernedPerson(
      this.assigneePerson.id,
      this.assignedPersonIds
    ).subscribe((result: any) => {
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
      this._confirmModelService.confirmed().subscribe(confirmed => {
        this._router.navigate(['allcomplains']);
      });
    })
  }
  goBack() {
    this._router.navigate(['allcomplains']);
  }
}
