import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccreditationRequestService } from '../../services/accreditation-request.service';
import { AuthStore } from '../../stores/auth/auth-store';
import { SingleAccreditationRequestStore } from '../../stores/single-accreditation-requests/single-accreditation-requests-store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-qualification-requests',
  templateUrl: './all-qualification-requests.component.html',
  styleUrls: ['./all-qualification-requests.component.css']
})
export class AllQualificationRequestsComponent implements OnInit, OnDestroy {

  currentUser: any = null;
  Subscription: Subscription = new Subscription();

  public displayedColumns = ['user', 'status', 'submittedAt', 'actions'];
  public displayedColumns2 = ['section', 'startDate', 'endDate', 'expiry', 'status', 'comments', 'actions'];
  public dataSource: any = [];
  public dataSource2: any = [];
  public apiLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;

  constructor(
    private _singleAccreditationRequestStore: SingleAccreditationRequestStore,
    private _authStore: AuthStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser.role !== 'sme') {
      this.adminDefaults();
    } else if (this.currentUser.role === 'sme') {
      this.smeDefaults();
    }
  }


  adminDefaults() {
    this.apiLoading = true;
    this._accreditationRequestService.getQulificationRequests().subscribe(
      (result: any) => {
        this.apiLoading = false;
        // console.log("RESULT AFETR GETTING ALL QUALIFICATION:--", result);
        this.dataSource2 = new MatTableDataSource(result);
        this.dataSource2.sortingDataAccessor = (item, property) => {
          if (property === 'user') {
            return item.initiatorFullName;
          } else {
            return item[property];
          }
        };
        this.dataSource2.sort = this.sort2;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM GETTING ALL QUALIFICATIONS:---", error);
      }
    );
  }

  smeDefaults() {
    this.apiLoading = true;
    this._accreditationRequestService.getSmeTasks().subscribe(
      (result: any) => {
        // console.log("RESULT SME TASKS:--", result);
        const array: any = result.qualification.map(c => {
          const date1: any = new Date();
          const date2: any = new Date(c.endDate);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(diffTime + " milliseconds");
          console.log(diffDays + " days");
          return {
            ...c,
            expiry: diffDays
          }
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property === 'section') {
            return item.sectionName;
          } else {
            return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR SME TASKS:--", error);
      }
    );

  }

  applyFilter(event: Event) {
    // console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    // console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToRequest(request) {
    // console.log("REQUEST ELECTED:--", request);
    if (this.currentUser.role === 'sme'){
      this._router.navigate(['/accreditation-requests', request.requestId, request.sectionId]);
    }else{
      this._router.navigate(['/accreditation-requests', request.id, 'view']);
    }
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
