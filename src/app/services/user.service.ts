import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getAllUsers() {
    const url = `${AppConfig.apiUrl}/user/getAllUsers`;
    return this._httpClient.get(
      url
    );
  }

  getAllUserTypes() {
    const url = `${AppConfig.apiUrl}/user/getTypes`;
    return this._httpClient.get(
      url
    );
  }

  getAllUserRoles() {
    const url = `${AppConfig.apiUrl}/user/getRoles`;
    return this._httpClient.get(
      url
    );
  }

  updateEligibleStatus(username) {
    const url = `${AppConfig.apiUrl}/user/updateEligibleStatus`;
    return this._httpClient.put(
      url,
      {
        "eligible": true,
        "username": username
      }
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
      }
    );
  }

  
  addRole(username, role) {
    const url = `${AppConfig.apiUrl}/user/addRole`;
    return this._httpClient.put(
      url,
      {
        "name": role,
        "username": username
      }
    );
  }

  addType(username, type) {
    const url = `${AppConfig.apiUrl}/user/addRole`;
    return this._httpClient.put(
      url,
      {
        "name": type,
        "username": username
      }
    );
  }



}
