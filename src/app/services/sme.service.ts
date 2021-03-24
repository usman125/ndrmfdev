import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmeService {


  authToken: any = null;
  httpOptions: any = null;

  constructor(
    private _httpClient: HttpClient,
  ) {
  }


  addSection(values) {
    const url = `${AppConfig.apiUrl}/setting/process/${values.formIdentity}/section/add`;
    console.log("VALUES FOR SME IN SERVICE:---", values);
    return this._httpClient.post(
      url,
      {
        "name": values.name,
        "orderNum": values.orderNum,
        "enabled": true
      }
    );
  }

  getAllSmes() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllActiveSections`;
    return this._httpClient.get(
      url,
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
    );
  }
}
