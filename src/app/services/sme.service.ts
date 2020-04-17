import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmeService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


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
      }
    );
  }

  getAllSmes() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllActiveSections`;
    return this._httpClient.get(
      url
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
      }
    );
  }
}
