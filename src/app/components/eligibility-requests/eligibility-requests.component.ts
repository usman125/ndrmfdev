import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
// import { SurveysStore } from "../../stores/surveys/surveys-store";
// import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import * as _ from 'lodash';
import { Subscription } from "rxjs";
import { UsersStore } from 'src/app/stores/users/users-store';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
// import { SurveysService } from "../../services/surveys.service";
import { UserService } from "../../services/user.service";
// import { MatTableDataSource } from "@angular/material/table";
// import { MatPaginator } from "@angular/material/paginator";
// import { MatSort } from "@angular/material/sort";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
// import {  } from "@angular/material/sort";

@Component({
  selector: 'app-eligibility-requests',
  templateUrl: './eligibility-requests.component.html',
  styleUrls: ['./eligibility-requests.component.css'],
  providers: [ConfirmModelService]
})
export class EligibilityRequestsComponent implements OnInit, OnDestroy {

  public allRequests: any = [];
  public allSurveys: any = [];
  public Subscription: Subscription = new Subscription();
  // public displayedColumns = ['user', 'status', 'actions'];
  // public dataSource: any = [];
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  public toggle: boolean = false;
  public selectedRequest: any = null;

  public selectedRequestItems: any = [];

  toggleBtn: boolean = false;
  secondForm: any = null;
  selectedRequestId: any = null;
  addMobileClasses: boolean = false;
  loadingApi: boolean = false;

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true
  }

  // values: any = { "CO1984CA2017": true, "SRA1860": false, "VSWOO1961": true, "TA1882": false, "EADGOP": false, "BTUN": false, "submit": true, "CO1984CA2017-status": "active", "VSWOO1961-status": "inactive" };

  constructor(
    private _authStore: AuthStore,
    // private _surveysStore: SurveysStore,
    // private _usersStore: UsersStore,
    private _confirmModelService: ConfirmModelService,
    private _accreditationRequestService: AccreditationRequestService,
    // private _surveysService: SurveysService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-ELIGIBILITY-REQUESTS');
    });

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      this.getRequest(this.selectedRequestId);
    });

    // this.getEligibilityRequest();
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.addMobileClasses = data.auth.applyMobileClasses;
        // console.log("ALL USERS:--", data.users);
      })
    );
  }

  // getEligibilityRequest() {
  //   this.loadingApi = true;
  //   this._accreditationRequestService.getEligibilityRequest().subscribe(
  //     (result: any) => {
  //       this.loadingApi = false;
  //       console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", result);
  //       this.allRequests = result;
  //       this.dataSource = new MatTableDataSource(this.allRequests);
  //       this.dataSource.sortingDataAccessor = (item, property) => {
  //         if (property === 'user') {
  //           return item.initiatorFullName;
  //         } else {
  //           return item[property];
  //         }
  //       };
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error => {
  //       this.loadingApi = false;
  //       console.log("ERROR GEETING ELIGIBILITY REQUESTS:---", error);
  //     }
  //   );

  // }

  getRequest(requestId) {
    // this.toggle = !this.toggle;
    this.loadingApi = true;
    this._accreditationRequestService.getSingleEligibilityRequest(requestId).subscribe(
      (result: any) => {
        this.selectedRequest = result;
        // this.selectedRequestItems = result;
        this.secondForm = JSON.parse(result.data);
        var object = {
          data: JSON.parse(result.data),
          initiatedBy: result.initiatedBy,
          processOwner: result.processOwner,
          status: result.status,
          submittedAt: result.submittedAt,
          template: JSON.parse(result.template),
        }
        this.selectedRequestItems = object;

        console.log("RESULT SINGLE ELIGIBILITY REQUEST:---", this.selectedRequestItems);
        if (this.selectedRequestItems.status == "Approved") {
          this.toggleBtn = true;
        } else {
          this.toggleBtn = false;
        }
        this.loadingApi = false;
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR SINGLE ELIGIBILITY REQUEST:---", error);
      }
    );
  }

  hideRequest() {
    // this.toggle = !this.toggle;
    this._location.back();
  }

  // applyFilter(event: Event) {
  //   console.log("APPLY FIKTER:--", event);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  markEligibleFlag() {
    console.log("MARK ELIGIBLE CALLED:--", this.selectedRequest);
    const options = {
      title: 'Approved!',
      message: 'Fip is now eligible for submitting the Qualification request',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this.loadingApi = true;
    this._userService.updateEligibleStatus(this.selectedRequestId).subscribe(
      result => {
        console.log("RESULR FROM MARKING ELIGIBLE:--", result);
        this.selectedRequest.status = "Approved";
        // this._usersStore.updateUserEligibleFlag('Approved', this.selectedRequestItems.initiatedBy.id);
        // this._authStore.setEligibleFlag('Approved');
        // this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
        this.toggleBtn = true;
        this.loadingApi = false;
        this._confirmModelService.open(options);
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR FROM MARKING ELIGIBLE:--", error);
      }
    );
  }

  intimateFip() { }

  markUnEligible() {
    console.log("mark un eligibile");
    const options = {
      title: 'Mark Un Eligible!',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      markUnEligible: true,
      markUnEligibleReason: ''
    };
    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(result => {
      console.log("RESULT", result);
    })

  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
