import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";
@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.css']
})
export class CEOComponent implements OnInit {
  displayedColumns = ['date','remarks', 'status','action'];
  dataSource
  loading: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
  ceoRespnseResulsut: any;

  constructor(
    private userServices: UserService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.userServices.CEOComplains().subscribe(
      result => {
        console.log("ALL Complains:--", result);
       this.ceoRespnseResulsut = result
       this.dataSource= this.ceoRespnseResulsut 
    
      },
      error => {
        console.log("ERROR FROM ALL COMPLAINS:--", error);
      }
    )
  }
  ceoActions(user){
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/ceoActions', user.complaintId]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
