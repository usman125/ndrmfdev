import { Injectable } from '@angular/core';
import { Store } from '../store';
import { UsersState } from './users-state';

@Injectable()
export class UsersStore extends Store<UsersState> {
  constructor() {
    super(new UsersState());
  }

  addUser(
    name: string,
    role: string,
    department: string,
    smeRef: string,
    email: string,
    username: string,
    password: string,
    active: boolean,
    eligibileFlag: boolean,
    qualificationFlag: boolean,
  ): void {
    this.setState({
      ...this.state,
      users: [
        ...this.state.users,
        {
          username: username,
          password: password,
          active: active,
          role: role,
          name: name,
          email: email,
          smeRef: smeRef,
          department: department,
          eligibileFlag: eligibileFlag,
          qualificationFlag: qualificationFlag,
        }
      ]
    });
  }


  editUser = (
    selectedUserEmail: string,
    name: string,
    email: string,
    role: string,
    smeRef: string,
    department: string,
    username: string,
    password: string,
  ): void => {
    this.setState({
      ...this.state,
      users: this.state.users.map((c) => {
        if (c.email === selectedUserEmail) {
          return {
            ...c,
            name: name,
            email: email,
            role: role,
            smeRef: smeRef,
            department: department,
            username: username,
            password: password,
          }
        }
        return c;
      })
    });
  }

  updateUser(
    email: string,
    role: string,
    smeRef: string,
  ): void {
    this.setState({
      ...this.state,
      users: this.state.users.map((c) => {
        if (c.email === email) {
          return {
            ...c,
            role: role,
            smeRef: smeRef,
            email: email,
          }
        }
        // console.log("MATCH VALUE:--", c, email, role, smeRef);
        return c;
      })
    });
  }

  updateUserEligibleFlag(
    eligibileFlag: boolean,
    email: string
  ): void {
    this.setState({
      ...this.state,
      users: this.state.users.map((c) => {
        if (c.email === email) {
          return { ...c, eligibileFlag: eligibileFlag }
        }
        return c;
      })
    });
  }

  updateUserQualificationFlag(
    qualificationFlag: boolean,
    email: string
  ): void {
    this.setState({
      ...this.state,
      users: this.state.users.map((c) => {
        if (c.email === email) {
          return { ...c, qualificationFlag: qualificationFlag }
        }
        return c;
      })
    });
  }

  findEligibleUser(
    email: string
  ): boolean {
    var flag: any = false;
    this.state.users.forEach((c) => {
      if (c.email === email && c.eligibileFlag === true) {
        flag = true;
      }
    })
    return flag;
  }
}