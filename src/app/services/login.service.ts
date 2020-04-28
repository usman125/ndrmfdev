import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable()
export class LoginService {

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
  ) { }

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
      email: "abc@abc.com",
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
      "typeName": 'fip',
      "username": values.username,
      "firstName": values.firstName,
    }
    const url = `${AppConfig.apiUrl}/signup`;
    console.log("REGISTER USER CALLED:--", values, url)
    return this._httpClient.post(
      url,
      params
    );
    
  }

}