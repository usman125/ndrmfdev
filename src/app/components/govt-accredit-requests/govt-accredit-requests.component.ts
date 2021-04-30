import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';
import { AccreditationRequestStore } from 'src/app/stores/accreditation-requests/accreditation-requests-store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AccreditationRequestReplayStore } from "../../stores/accreditation-requests/AccreditationRequestReplayStore";
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
    private _accreditationRequestReplayStore: AccreditationRequestReplayStore,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    )
    this.Subscription.add(
      this._accreditationRequestStore.state$.subscribe(data => {
        console.log("AFTER VIEW INIT:--", data.requests);
        // let newArray = [];
        // data.requests.forEach((c) => {
        //   if (c.pending) {
        //     newArray.push(c);
        //   }
        // });
        // this.dataSource = new MatTableDataSource(newArray);
        this.dataSource = new MatTableDataSource(data.requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
    this.getPendingRequests();
  }

  getPendingRequests() {
    this._authStore.setLoading();
    this._accreditationRequestService.getAllAccreditationQuestionnaire().subscribe(
      (result: any) => {
        let newArray = result.map((c) => {
          return {
            ...c,
            pending: c.status === "Pending" ? true : false,
            data: JSON.parse(c.data)
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
    // this._accreditationRequestService.getPendingAccreditation().subscribe(
    //   (result: any) => {
    //     let newArray = result.map((c) => {
    //       return {
    //         ...c,
    //         pending: true
    //       }
    //     })
    //     this._accreditationRequestStore.addAllRequests(newArray);
    //     this._authStore.removeLoading();
    //   },
    //   error => {

    //     this._authStore.removeLoading();
    //     console.log("ERROR FROM PENDING ACCREDITATIONS:--", error);
    //   }
    // );
  }

  ngAfterViewInit() {
  }

  goToRequest(element) {
    console.log("REQUEST TO GET:---", element);
    // this._router.navigate(['view-govt-agency-request', element.id]);
    // this.viewRequest = true;
    // this.selectedrequest = element;
    var clearObject = {
      id: element.id,
      assignee: element.assignee,
      forUser: element.forUser,
      assigned: element.assigned,
      pending: element.pending,
      status: element.status,
      data: element.data,
      isJv: element.jv,
      jvUser: element.jvUser,
    }
    this._accreditationRequestReplayStore.addRequests(clearObject);
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id}+${index}`;
  }

  ngOnDestroy() {
    // setAccreditationRequestReplay(
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    // );
    this._accreditationRequestStore.addAllRequests([]);
    this.Subscription.unsubscribe();
  }

}
