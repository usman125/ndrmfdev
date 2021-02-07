import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { UsersStore } from 'src/app/stores/users/users-store';

@Component({
  selector: 'app-all-eligibility-requests',
  templateUrl: './all-eligibility-requests.component.html',
  styleUrls: ['./all-eligibility-requests.component.css'],
  providers: [ConfirmModelService]
})
export class AllEligibilityRequestsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  addMobileClasses: any = null;
  loadingApi: boolean = false;
  allRequests: any = [];
  dataSource: any = [];
  public displayedColumns = ['user', 'status', 'submittedAt', 'comment', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private _authStore: AuthStore,
    // private _surveysStore: SurveysStore,
    private _usersStore: UsersStore,
    private _confirmModelService: ConfirmModelService,
    private _accreditationRequestService: AccreditationRequestService,
    // private _surveysService: SurveysService,
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-ELIGIBILITY-REQUESTS');
    });

    this.getEligibilityRequest();
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.addMobileClasses = data.auth.applyMobileClasses;
        // console.log("ALL USERS:--", data.users);
      })
    );
  }

  getEligibilityRequest() {
    this.loadingApi = true;
    this._accreditationRequestService.getEligibilityRequest().subscribe(
      (result: any) => {
        this.loadingApi = false;
        console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", result);
        this.allRequests = result;
        this.dataSource = new MatTableDataSource(this.allRequests);
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property === 'user') {
            return item.initiatorFullName;
          } else {
            return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR GEETING ELIGIBILITY REQUESTS:---", error);
      }
    );

  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRequest(request) {
    this._router.navigate(['eligibility-requests', request.id])
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
