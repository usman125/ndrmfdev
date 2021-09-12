import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { QprToDonorService } from '../../services/qpr-to-donor.service';


// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

// /** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];


@Component({
  selector: 'app-qpr-to-donor',
  templateUrl: './qpr-to-donor.component.html',
  styleUrls: ['./qpr-to-donor.component.css'],
  providers: [ConfirmModelService]
})
export class QprToDonorComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['initiatorFullName', 'status', 'submittedAt', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  apiLoading: boolean = false;

  loggedUser: any = JSON.parse(localStorage.getItem('user'));

  constructor(
    private _qprToDonorService: QprToDonorService,
    private _router: Router,
    private _confirmModelService: ConfirmModelService,
  ) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.apiLoading = true;
    this._qprToDonorService.getAllRequests().subscribe(
      (result: any) => {
        console.log("RESULT ALL QPR TO DONORL--", result);
        this.dataSource = new MatTableDataSource(result);
        // this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.apiLoading = false;
      },
      error => {
        console.log("RESULT ALL QPR TO DONORL--", error);
      }
    );
  }

  commenceQprToDonor() {
    this.apiLoading = true;
    this._qprToDonorService.commenceQprToDonorRequest().subscribe(
      (result: any) => {
        console.log("RESULT COMMENCE QPR TO DONOR:--", result);
        const options = {
          title: 'Request Commenced Successfully!',
          message: '',
          cancelText: 'OK',
          confirmText: 'OK',
          add: true,
        };
        this._confirmModelService.open(options);
        // this.dataSource = new MatTableDataSource(result);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          this.apiLoading = false;
          this.getAllRequests();
        })
      },
      error => {
        console.log("RESULT COMMENCE QPR TO DONOR:--", error);
        const options = {
          title: error.error.message,
          message: 'Please contact system administrator!',
          cancelText: 'OK',
          confirmText: 'OK',
          add: true,
        };
        this._confirmModelService.open(options);
        // this.dataSource = new MatTableDataSource(result);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          this.apiLoading = false;
        })
      }
    );
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToRequest(row) {
    this._router.navigate(['/qpr-to-donor', row.id]);
  }

}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
//   };
// }
