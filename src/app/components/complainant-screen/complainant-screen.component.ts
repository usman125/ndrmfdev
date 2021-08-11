import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-complainant-screen',
  templateUrl: './complainant-screen.component.html',
  styleUrls: ['./complainant-screen.component.css']
})
export class ComplainantScreenComponent implements OnInit {

  displayedColumns = ['Complaint Name','Address','Email','CNIC','againstPerson', 'Category', 'Location','InternalStatus', 'SequenceNumber', 'ConsultantName', 'askForEvidence'];
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
    this.userServices.getComplainantByUserId(this.logggedInUserData.id).subscribe((result: any) => {
      console.log("complainant complains", result);
      this.complains = result;
      this.dataSource = this.complains
    });
  }

  AskForEvidenceAndreviews(user){
 
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/evidenceAndReviews', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  
  }
  
}
