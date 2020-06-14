import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';
import { AccreditationRequestStore } from 'src/app/stores/accreditation-requests/accreditation-requests-store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { setAccreditationRequestReplay } from "../../stores/accreditation-requests/AccreditationRequestReplay";
import { AuthStore } from 'src/app/stores/auth/auth-store';

@Component({
  selector: 'app-govt-accredit-requests',
  templateUrl: './govt-accredit-requests.component.html',
  styleUrls: ['./govt-accredit-requests.component.css']
})
export class GovtAccreditRequestsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: any = ['name', 'action'];
  dataSource;

  apiLoading: boolean = false;

  viewRequest: boolean = false;
  selectedrequest: any = null;

  Subscription: Subscription = new Subscription();


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }


  ngOnInit(): void {

    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    )

    this._authStore.setLoading();
    this._accreditationRequestService.getPendingAccreditation().subscribe(
      (result: any) => {
        let newArray = result.map((c) => {
          return {
            ...c,
            pending: true
          }
        })
        this._accreditationRequestStore.addAllRequests(newArray);
        this._authStore.removeLoading();
      },
      error => {

        this._authStore.removeLoading();
        console.log("ERROR FROM PENDING ACCREDITATIONS:--", error);
      }
    );
    this.Subscription.add(
      this._accreditationRequestStore.state$.subscribe(data => {
        console.log("AFTER VIEW INIT:--", data.requests);
        let newArray = [];
        data.requests.forEach((c) => {
          if (c.pending) {
            newArray.push(c);
          }
        });
        this.dataSource = new MatTableDataSource(newArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  ngAfterViewInit() {
  }

  goToRequest(element) {
    console.log("REQUEST TO GET:---", element);
    // this._router.navigate(['view-govt-agency-request', element.id]);
    // this.viewRequest = true;
    // this.selectedrequest = element;
    setAccreditationRequestReplay(
      element.id,
      element.assignee,
      element.forUser,
      element.assigned
    );
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id}`;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
