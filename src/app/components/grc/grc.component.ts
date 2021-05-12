import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-grc',
  templateUrl: './grc.component.html',
  styleUrls: ['./grc.component.css']
})
export class GRCComponent implements OnInit {
  displayedColumns = ['Complaint Name','Address','Email','CNIC','againstPerson', 'Category', 'Location','InternalStatus', 'SequenceNumber', 'ConsultantName', 'Actions'];
  dataSource
  complains: any;
  logggedInUserData: any;
  priority: any;
  status: any;
  results: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
  
    private userServices: UserService,
     private _router: Router,
  ) {
    this.logggedInUserData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.userServices.getComplainantByUserId(this.logggedInUserData.userId).subscribe((result: any) => {
      console.log("GRC complainst", result);
      this.complains = result;
      this.dataSource = this.complains
    });
  }
  goToGRC(user){
 
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/grcActions', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  
  }
 
}
