import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QprService } from '../../services/qpr.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { formValuesReplay } from "../../stores/form-values";

@Component({
  selector: 'app-qpr',
  templateUrl: './qpr.component.html',
  styleUrls: ['./qpr.component.css']
})
export class QprComponent implements OnInit {

  dataSource: any;
  displayedColumns = ['fipname', 'projectname', 'quarter', 'duedate', 'status', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loggedUser: any = null;
  Subscription: Subscription = new Subscription();

  apiLoading: boolean = false;

  @Output()
  viewOnly: any = true;

  constructor(
    private _qprService: QprService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.getQprRequests();
    // this.getSingleQprRequests();
    formValuesReplay.subscribe((data: any) => {
      console.log("FORM VALUES QPR:---", data.form);
    }).unsubscribe();
  }

  getQprRequests() {
    this.apiLoading = true;
    this._qprService.getQPRRequests().subscribe(
      (result: any) => {
        console.log("RESULT ALL REQUEST:---", result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("RESULT ALL REQUEST:---", error);
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

  goToRequest(element) {
    console.log("REQUEST TO VIEW:--", element);
    // if (this.loggedUser.role === 'fip') {
    this._router.navigate(['/fill-qpr', element.id]);
    // }
  }

}
