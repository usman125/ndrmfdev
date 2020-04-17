import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  addSurvey(values) {
    const url = `${AppConfig.apiUrl}/accreditation/addSurvey`;
    let body = {
      "component": JSON.stringify(values.components),
      "displayType": values.type,
      "formIdentity": values.formIdentity,
      "numOfPages": values.numOfPages,
      "page": values.page,
      "passingScore": values.passScore,
      "sectionKey": values.smeRef,
      "sectionName": values.name,
      "status": "active",
      "totalScore": values.totalScore
    }
    console.log("VALUES IN ADD SURVEY:--", values, body);
    return this._httpClient.post(
      url,
      body
    );
  }

  getAllSurveys() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllActivesurvey`;
    return this._httpClient.get(
      url
    );
  }

  updateSurvey(values) {
    const url = `${AppConfig.apiUrl}/accreditation/updateSection`;
    return this._httpClient.put(
      url,
      {
        "component": values.component,
        "displayType": values.diplay,
        "formIdentity": values.formIdentity,
        "numOfPages": values.numOfPages,
        "page": values.page,
        "passingScore": values.passScore,
        "sectionKey": values.smeRef,
        "sectionName": null,
        "status": "active",
        "totalScore": values.totalScore
      }
    );
  }
}
