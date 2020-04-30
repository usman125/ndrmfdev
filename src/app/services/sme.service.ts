import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStore } from '../stores/auth/auth-store';

@Injectable({
  providedIn: 'root'
})
export class SmeService {


  authToken: any = null;
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
      };
    });
  }


  addSme(values) {
    const url = `${AppConfig.apiUrl}/accreditation/addSection`;
    console.log("VALUES FOR SME IN SERVICE:---", values);
    return this._httpClient.post(
      url,
      {
        "formGenerated": false,
        "sectionKey": values.key,
        "sectionName": values.name,
        "userName": values.userRef,
        "formIdentity": values.formIdentity,
        "active": true
      },
      this.httpOptions,
    );
  }

  getAllSmes() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllActiveSections`;
    return this._httpClient.get(
      url,
      this.httpOptions
    );
  }

  updateSme(name, key, userRef, formGenerated, formIdentity) {
    const url = `${AppConfig.apiUrl}/accreditation/updateSection`;
    return this._httpClient.put(
      url,
      {
        "formGenerated": formGenerated,
        "sectionKey": key,
        "sectionName": name,
        "userName": userRef,
        "formIdentity": formIdentity,
      },
      this.httpOptions,
    );
  }
}
