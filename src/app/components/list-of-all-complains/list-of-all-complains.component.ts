import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-of-all-complains',
  templateUrl: './list-of-all-complains.component.html',
  styleUrls: ['./list-of-all-complains.component.css']
})
export class ListOfAllComplainsComponent implements OnInit {
  displayedColumns = ['date','email','name','status','againstPerson', 'contactNumber', 'priority','sequence','action', 'assign', 'emailToConcernPerson','UpdateSatus','ShowAttachments'];
  dataSource
 allComplainsData: any;
 loading: boolean;
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userServices: UserService,
    private _router: Router,


    ) { }

  ngOnInit(): void {
this.userServices.getAllComplains().subscribe(
  result => {
    console.log("ALL Complains:--", result);
   this.allComplainsData = result
   this.dataSource= this.allComplainsData
 
  },
  error => {
    console.log("ERROR FROM ALL COMPLAINS:--", error);
  }
);
  }

  eidtUser(user) {
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/edit-complain', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  assignComplain(user){
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/AssignToConcernedPerson', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  emailToConcernPerson(user){
   this._router.navigate(['/emailtoConcernPerson', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  ShowAtatchments(user){
   this._router.navigate(['/showAttachments', user.id]);
   localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  updateComplaintStatus(user){
    this._router.navigate(['/UpdateStatus', user.id]);
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
