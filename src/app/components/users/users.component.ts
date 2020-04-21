import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UsersStore } from "../../stores/users/users-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { setCurrentUser } from '../../stores/users/user-replay';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from "../../services/user.service";
import { SmeService } from "../../services/sme.service";
// import { map, flatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  private _subscription: Subscription = new Subscription();
  public allUsers: any = [];

  displayedColumns = ['email', 'smeRef', 'department', 'active', 'role', 'action'];
  dataSource;
  loggedUser: any = null;
  loading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(
    private _usersStore: UsersStore,
    private _authStore: AuthStore,
    private _router: Router,
    // private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService,
    private _smeService: SmeService,
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
    this._authStore.setLoading();
    this._smeService.getAllSmes().subscribe(
      sections => {
        console.log("ALL ACTIVE SECTIONS:---", sections);
        this._userService.getAllUsers().subscribe(
          result => {
            this._authStore.removeLoading();
            let usersArray = [];
            for (let i = 0; i < result['userInfoList'].length; i++) {
              var object = {
                name: result['userInfoList'][i].firstName,
                email: result['userInfoList'][i].email,
                role: result['userInfoList'][i].typeName,
                smeRef: result['userInfoList'][i].roleName,
                department: null,
                username: result['userInfoList'][i].username,
                password: null,
                active: result['userInfoList'][i].active,
                eligibileFlag: result['userInfoList'][i].eligible,
                qualificationFlag: result['userInfoList'][i].qualified,
                roleNames: result['userInfoList'][i].roleNames,
                groupNames: result['userInfoList'][i].groupNames,
              }
              if (object.role === 'ndrmf' && result['userInfoList'][i]['roleNames'].length) {
                object.role = result['userInfoList'][i]['roleNames'][0];
              }
              if (result['userInfoList'][i].typeName === 'fip') {
                if (result['userInfoList'][i].roleNames.length) {
                  object.role = result['userInfoList'][i].roleNames[0];
                }
              }
              if (object.role === 'sme') {
                sections['sectionInfos'].forEach(element => {
                  if (element.username === object.username) {
                    object.smeRef = element.sectionName;
                  }
                });
              }
              usersArray.push(object);
            }
            this._usersStore.setAllUsers(usersArray);

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
          },
          error => {
            this._authStore.removeLoading();
            console.log("ERROR FROM ALL USERS:--", error);
          }
        );
      },
      error => {
        console.log("ERROR ACTIVE SECTIONS:---", error);
      }
    );
  }

  ngAfterViewInit() {
    if (!this.allUsers.length) {
    }
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
    // this._changeDetectorRef.detectChanges();
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


}
