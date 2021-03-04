import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService {

  authToken: any = null;
  httpOptions: any = null;

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
  ) {
  }

  loggedIn() {
    if (localStorage.getItem('user') !== null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    var self = this;
    localStorage.removeItem('user')
    self._router.navigate(['/'])
  }

  loginUser(values) {
    let params = {
      username: values.username,
      password: values.password
    };
    const url = `${AppConfig.apiUrl}/login`;
    console.log("LOGIN USER CALLED:--", values, url)
    return this._httpClient.post(
      url,
      params
    );
  }

  registerUser(values) {
    let params = {
      "email": values.email,
      "password": values.password,
      "lastName": values.lastName,
      "firstName": values.firstName,
      "entityName": values.entityName,
      "entityNature": values.entityNature,
      "entityType": values.entityType,
      "location": values.location,
      "province": values.province,
      "address": values.address,
      "otherAddress": values.otherAddress,
      "otherAccreditation": values.otherAccreditation,
    }
    const url = `${AppConfig.apiUrl}/user/signup`;
    console.log("REGISTER USER CALLED:--", values, url)
    return this._httpClient.post(
      url,
      params,
    );

  }


  checkAccreditationStatus() {
    const url = `${AppConfig.apiUrl}/accreditation/status`;
    return this._httpClient.get(
      url,
    );

  }



}