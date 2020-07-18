import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UsersStore } from "../../stores/users/users-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { setCurrentUser } from '../../stores/users/user-replay';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from "../../services/user.service";
import { ConfirmModelService } from '../../services/confirm-model.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmModelService]
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  private _subscription: Subscription = new Subscription();
  public allUsers: any = [];

  displayedColumns = ['email', 'smeRef', 'department', 'role', 'action'];
  dataSource;
  loggedUser: any = null;
  loading: boolean;
  withoutPasswords: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(
    private _usersStore: UsersStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });
    this._subscription.add(
      this._authStore.state$.subscribe(data => {
        this.loading = data.auth.apiCall;
      })
    );
    this.getAllUsers();
    this._subscription.add(
      this._usersStore.state$.subscribe(data => {
        this.allUsers = data.users;
        console.log("ALL USERS ARE:--", this.allUsers);
        this.dataSource = new MatTableDataSource(data.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  getAllUsers() {
    this.withoutPasswords = false;
    this._authStore.setLoading();
    this._userService.getAllUsers().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("ALL ACTIVE USERS:---", result);
        let mainArray = [];
        mainArray.push(result);
        let usersArray = [];
        for (let i = 0; i < result.length; i++) {
          var object = {
            id: result[i].id,
            firstName: result[i].firstName,
            lastName: result[i].lastName,
            email: result[i].email,
            username: result[i].username,
            password: result[i].password || null,
            role: result[i].roles ?
              result[i].roles[0] ?
                result[i].roles[0].name.toLowerCase() : 'FIP'.toLowerCase()
              : null,
            smeRef: null,
            department: result[i].departmentId || null,
            active: result[i].enabled,
            eligibileFlag: false,
            qualificationFlag: false,
            roles: result[i].roles,
            orgId: result[i].orgId,
            orgName: result[i].orgName,
            org: [{ 'id': result[i].orgId, 'name': result[i].orgName }]
          }
          usersArray.push(object);
        }
        this._usersStore.setAllUsers(usersArray);

      },
      error => {
        this.withoutPasswords = false;
        this._authStore.removeLoading();
        console.log("ERROR FROM ALL USERS:--", error);
      }
    );
  }

  getUsersWithoutCredentials() {
    this.withoutPasswords = true;
    this._authStore.setLoading();
    this._userService.getUsersWithMissingCredentials().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("ALL USERS WITHOUT CREDENTAILS:---", result);
        let mainArray = [];
        mainArray.push(result);
        let usersArray = [];
        for (let i = 0; i < result.length; i++) {
          var object = {
            id: result[i].id,
            firstName: result[i].firstName,
            lastName: result[i].lastName,
            email: result[i].email,
            username: result[i].username,
            password: result[i].password || null,
            role: result[i].roles ?
              result[i].roles[0] ?
                result[i].roles[0].name.toLowerCase() : 'FIP'.toLowerCase()
              : null,
            smeRef: null,
            department: result[i].departmentId || null,
            active: result[i].enabled,
            eligibileFlag: false,
            qualificationFlag: false,
            roles: result[i].roles,
            orgId: result[i].orgId,
            orgName: result[i].orgName,
            org: [{ 'id': result[i].orgId, 'name': result[i].orgName }]
          }
          usersArray.push(object);
        }
        this._usersStore.setAllUsers(usersArray);
      },
      error => {
        this.withoutPasswords = false;
        this._authStore.removeLoading();
        console.log("RESULT AFTER GETTING MISSING CREDENTIAL USERS:--", error);
      },
    )
  }

  ngAfterViewInit() {
    if (!this.allUsers.length) {
    }
  }

  eidtUser(user) {
    console.log("user to edit:--\n", user);
    setCurrentUser(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.role,
      user.smeRef,
      user.department,
      user.username,
      user.password,
      user.active,
      user.eligibileFlag,
      user.qualificationFlag,
      user.roles,
      user.orgId,
      user.orgName,
    );
    this._router.navigate(['/edit-user', user.id]);
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToAdd() {
    this._router.navigate(['/add-user']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.email}`;
  }

  syncUser() {
    const options = {
      title: 'Success!',
      message: 'Registartion Received, we will review your application.',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    this._authStore.setLoading();
    this._userService.syncUsers().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        if (result.inserted !== 0) {
          options.message = `${result.inserted} Users Inserted`
        }
        if (result.updated !== 0) {
          options.message = `${result.updated} Users Updated`
        }
        if (result.rejectedUsers !== null) {
          options.message = `${result.rejectedUsers} Users Rejected`
        }
        this._confirmModelService.open(options);
        console.log("RESULT SYNCING USER:--", result);
      },
      error => {
        this._authStore.removeLoading();
        console.log("RESULT SYNCING USER:--", error);
      }
    )
  }


}
