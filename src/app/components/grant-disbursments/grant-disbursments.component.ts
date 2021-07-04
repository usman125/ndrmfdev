import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrantDisbursmentsService } from 'src/app/services/grant-disbursment.service';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { GrantDisbursmentsStore } from 'src/app/stores/grant-disbursments/grant-disbursments-store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grant-disbursments',
  templateUrl: './grant-disbursments.component.html',
  styleUrls: ['./grant-disbursments.component.css']
})
export class GrantDisbursmentsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();

  public displayedColumns = ['proposalName', 'created_by', 'create_date', 'actions'];
  // public displayedColumns2 = ['section', 'startDate', 'endDate', 'expiry', 'status', 'comments', 'actions'];
  public dataSource: any = [];
  // public dataSource2: any = [];
  public apiLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;
  // @ViewChild('sort2') sort2: MatSort;

  // apiLoading: boolean = false;

  constructor(
    public _grantDisbursmentsStore: GrantDisbursmentsStore,
    public _authStore: AuthStore,
    public _router: Router,
    public _grantDisbursmentsService: GrantDisbursmentsService,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._grantDisbursmentsStore.state$.subscribe(
        data => {
          console.log("STORE DISBUSMENTS:---", data.disbursments);
          if (data.disbursments.length) {
            this.apiLoading = false;
            this.dataSource = new MatTableDataSource(data.disbursments);
            this.dataSource.sort = this.sort;
            // this.dataSource2.sortingDataAccessor = (item, property) => {
            //   if (property === 'name') {
            //     return item.initiatorFullName;
            //   } else {
            //     return item[property];
            //   }
            // };
            this.dataSource.paginator = this.paginator;
          }
        }
      )
    );
    this.getAllDisbursments();
  }

  getAllDisbursments() {
    this.apiLoading = true;
    this._grantDisbursmentsService.getGrantDisbursments().subscribe(
      (result: any) => {
        // console.log("ALL GRANT DISBURSMENTS:---", result);
        this._grantDisbursmentsStore.addGrantDisbursments(result);
      },
      error => {
        console.log("ALL GRANT DISBURSMENTS:---", error);
      }
    );
  }

  applyFilter(event: Event) {
    // console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDisbursmentDetails(element) {
    console.log("GET DISBURSSMENT DETAILS:---", element);
    // this._grantDisbursmentsService.getSingleGrantDisbursment(element.id).subscribe(
    //   (result: any) => {
    //     console.log("RESULT SINGLE GRANT DISBURSMENT:---", result);
    //   },
    //   error => {
    //     console.log("RESULT SINGLE GRANT DISBURSMENT:---", error);
    //   }
    // )
    this._router.navigate(['view-grant-disbursment', element.id]);
  }

  ngOnDestroy() {
    this._grantDisbursmentsStore.addGrantDisbursments([]);
    this.Subscription.unsubscribe();
  }

}
