import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authToken: string = null;
  httpOptions: any = null;

  constructor(
    private _httpClient: HttpClient,
  ) {
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
        "username": values.username
      }
    );
  }

  editUser(values, id) {
    const url = `${AppConfig.apiUrl}/user/${id}`;
    console.log("VALUES IN EDIT USER:--", values);
    return this._httpClient.put(
      url,
      {
        "departmentId": values.department,
        "designationId": null,
        "email": values.email,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "orgId": values.org.length ? values.org[0].id : null,
        "password": values.password,
        "roleId": values.role.id ? values.role.id : null,
        "username": values.username,
        "enabled": values.active
      }
    );
  }

  getAllUsers() {
    const url = `${AppConfig.apiUrl}/user/`;
    return this._httpClient.get(
      url,
    );
  }

  getAllDepartmentUsers() {
    const url = `${AppConfig.apiUrl}/user/grouped-by-department`;
    return this._httpClient.get(
      url,
    );
  }

  getAllUserOrgs() {
    const url = `${AppConfig.apiUrl}/user/orgs`;
    return this._httpClient.get(
      url,
    );
  }

  getAllUserRoles() {
    const url = `${AppConfig.apiUrl}/user/getRoles`;
    return this._httpClient.get(
      url,
    );
  }

  updateEligibleStatus(id) {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility/${id}/approve`;
    return this._httpClient.post(
      url,
      null
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
    );
  }

  withRoleprocessOwner() {
    const url = `${AppConfig.apiUrl}/user/withRoleprocessOwner`;
    return this._httpClient.get(
      url
    );
  }

  withRoleSME() {
    const url = `${AppConfig.apiUrl}/user/withRoleSME`;
    return this._httpClient.get(
      url
    );
  }

  getDmPams() {
    const url = `${AppConfig.apiUrl}/user/withRoleDMPAM`;
    return this._httpClient.get(
      url
    );
  }

  getUserById(id) {
    const url = `${AppConfig.apiUrl}/user/${id}`;
    return this._httpClient.get(
      url
    );
  }

  getUsersWithMissingCredentials() {
    const url = `${AppConfig.apiUrl}/user/missing-credentials`;
    return this._httpClient.get(
      url
    );
  }

  syncUsers() {
    const url = `${AppConfig.apiUrl}/bridge/users/fetch`;
    return this._httpClient.get(
      url
    );
  }

  saveThemticAreas(areas) {
    const url = `${AppConfig.apiUrl}/user/thematic-area`;
    return this._httpClient.post(
      url,
      areas
    );
  }



}
