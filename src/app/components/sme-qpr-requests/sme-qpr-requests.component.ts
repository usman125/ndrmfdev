import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { QprService } from '../../services/qpr.service';
// import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';

@Component({
  selector: 'app-sme-qpr-requests',
  templateUrl: './sme-qpr-requests.component.html',
  styleUrls: ['./sme-qpr-requests.component.css']
})
export class SmeQprRequestsComponent implements OnInit {

  dataSource: any;
  displayedColumns = ['section', 'fipName', 'quarter', 'startDate', 'expiry', 'status', 'comments', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loggedUser: any = null;
  Subscription: Subscription = new Subscription();

  apiLoading: boolean = false;

  currentUser: any = JSON.parse(localStorage.getItem('user'));

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.smeDefaults();
  }

  smeDefaults() {
    this.apiLoading = true;
    this._accreditationRequestService.getSmeTasks().subscribe(
      (result: any) => {
        const array: any = result.qpr.map(c => {
          return {
            ...c,
            expiry: this.calculateDaysDifference(c.endDate)
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
        console.log("RESULT SME TASKS:--", this.dataSource, array);
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR SME TASKS:--", error);
      }
    );

  }

  calculateDaysDifference(date) {
    var date1 = new Date();
    var date2 = new Date(date);

    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log("TIME DIFFERENCE:", Difference_In_Time, Math.trunc(Difference_In_Days), Math.floor(Difference_In_Days));
    if (Math.trunc(Difference_In_Days) < 0) {
      return Math.trunc(Difference_In_Days);
    } else {
      return Math.trunc(Difference_In_Days);

    }
  }

  goToRequest(request) {
    // console.log("REQUEST ELECTED:--", request);
    // if (this.currentUser.role === 'sme') {
    this._router.navigate(['/fill-qpr', request.requestId]);
    // } 
    // else {
    //   this._router.navigate(['/accreditation-requests', request.id, 'view']);
    // }
  }

  applyFilter2(event: Event) {
    // console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
