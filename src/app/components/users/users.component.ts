import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersStore } from "../../stores/users/users-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
// import { CoffeeElectionStore } from '../../stores/coffee-election/coffee-election.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers: [UsersStore]
})
export class UsersComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();
  public allUsers: any = [];

  displayedColumns = ['name', 'email', 'smeRef', 'department', 'role'];
  dataSource = [];

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
        this.allUsers = data.users;
        this.dataSource = this.allUsers;
      })
    );
    // console.log("ALL USERS ARE:--", this.allUsers);
  }


  goToAdd(){
    this._router.navigate(['/add-user']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
