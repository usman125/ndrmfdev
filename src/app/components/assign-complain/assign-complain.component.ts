import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";


@Component({
  selector: 'app-assign-complain',
  templateUrl: './assign-complain.component.html',
  styleUrls: ['./assign-complain.component.css']
})
export class AssignComplainComponent implements OnInit {
  displayedColumns = ['date','email','name','status', 'contactNumber', 'priority','sequence','action', 'email to concerned person'];
  dataSource
 allComplainsData: any;
 loading: boolean;
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  allUsers: any;
  userId: any
  allComplains: any;
  constructor(

    private userServices: UserService,
    private _router: Router,

     ) {
this.userServices.getAllComplains().subscribe(
  (result: any) => {
    console.log("allComplains", result)
    this.dataSource = result
  }
)
      }

  ngOnInit(): void {

  }
  assignComplain(user){
    console.log("complain to edit:--\n", user);
    this._router.navigate(['/AssignToConcernedPerson', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
  emailToConcernPerson(user){
    console.log("email to concernperson:--\n", user);
    this._router.navigate(['/emailtoConcernPerson', user.id]);
    localStorage.setItem('complainToEdit', JSON.stringify(user));
  }
}
