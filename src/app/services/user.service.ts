import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStore } from '../stores/auth/auth-store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authToken: string = null;
  httpOptions: any = null;

  constructor(
    private _httpClient: HttpClient,
    private _authStore: AuthStore,
  ) {
    this._authStore.state$.subscribe((data) => {
      this.authToken = data.auth.authToken;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authToken,
        })
      }
    }).unsubscribe();
  }


  addUser(values) {
    const url = `${AppConfig.apiUrl}/user/create`;
    return this._httpClient.post(
      url,
      {
        "departmentId": values.department,
        "designationId": null,
        "email": values.email,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "orgId": values.org.id,
        "password": values.password,
        "roleId": values.role.id,
        "username":values.username 
      }
    );
  }

  getAllUsers() {
    console.log("AUTH TOKEN IN USER SERVICE:--", this.authToken);
    const url = `${AppConfig.apiUrl}/user/`;
    return this._httpClient.get(
      url,
      this.httpOptions,
    );
  }

  getAllUserOrgs() {
    const url = `${AppConfig.apiUrl}/user/orgs`;
    return this._httpClient.get(
      url,
      this.httpOptions,
    );
  }

  getAllUserRoles() {
    const url = `${AppConfig.apiUrl}/user/getRoles`;
    return this._httpClient.get(
      url,
      this.httpOptions,
    );
  }

  updateEligibleStatus(username) {
    const url = `${AppConfig.apiUrl}/user/updateEligibleStatus`;
    return this._httpClient.put(
      url,
      {
        "eligible": true,
        "username": username
      },
      this.httpOptions,
    );
  }

  updateActiveStatus(username) {
    const url = `${AppConfig.apiUrl}/user/updateActiveStatus`;
    return this._httpClient.put(
      url,
      {
        "active": true,
        "username": username
      }
    );
  }

  unSetActiveStatus(username) {
    const url = `${AppConfig.apiUrl}/user/updateActiveStatus`;
    return this._httpClient.put(
      url,
      {
        "active": false,
        "username": username
      },
      this.httpOptions,
    );
  }


  addRole(username, role) {
    const url = `${AppConfig.apiUrl}/user/addRole`;
    return this._httpClient.put(
      url,
      {
        "name": role,
        "username": username
      },
      this.httpOptions,
    );
  }

  addType(username, type) {
    const url = `${AppConfig.apiUrl}/user/addRole`;
    return this._httpClient.put(
      url,
      {
        "name": type,
        "username": username
      },
      this.httpOptions,
    );
  }



}
