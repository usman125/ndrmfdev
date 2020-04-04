import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersStore } from "../../stores/users/users-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { setCurrentUser } from '../../stores/users/user-replay';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers: [UsersStore]
})
export class UsersComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  public allUsers: any = [];

  displayedColumns = ['name', 'email', 'smeRef', 'department', 'role', 'action'];
  dataSource;
  loggedUser: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(
    private _usersStore: UsersStore,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });
    this._subscription.add(
      this._usersStore.state$.subscribe(data => {
        // this.allUsers = data.users;
        this.dataSource = new MatTableDataSource(data.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("ALL USERS ARE:--", data.users);
      })
    );
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  eidtUser(user) {
    console.log("user to edit:--\n", user);
    setCurrentUser(
      user.name,
      user.email,
      user.role,
      user.smeRef,
      user.department,
      user.username,
      user.password,
      user.active,
      user.eligibileFlag,
      user.qualificationFlag,
    );
    this._router.navigate(['/add-user']);
  }


  goToAdd() {
    this._router.navigate(['/add-user']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }



}
