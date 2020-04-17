import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccreditationRequestService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getAllAccreditationRequests() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllAccreditations`;
    return this._httpClient.get(
      url
    );
  }

  addAccreditationRequest(values) {
    const url = `${AppConfig.apiUrl}/accreditation/addAccreditation`;
    console.log("VALUES FOR SME IN SERVICE:---", values);
    return this._httpClient.post(
      url,
      {
        "currentReview": values.currentReview,
        "endDate": values.endDate,
        "formData": 'values',
        "formIdentity": values.formIdentity,
        "formSubmitData": JSON.stringify(values.formSubmitData),
        "prevReview": values.prevReview,
        "ratings": values.ratings,
        "requestKey": values.requestKey,
        "sectionKey": values.sectionKey,
        "startDate": values.startDate,
        "status": values.status,
        "userName": values.userName,
        "userUpdateFlag": values.userUpdateFlag
      }
    );
  }

  updateAccreditationRequest(values) {
    const url = `${AppConfig.apiUrl}/accreditation/updateAccreditation`;
    console.log("VALUES FOR SME IN SERVICE:---", values);
    return this._httpClient.put(
      url,
      {
        "currentReview": values.currentReview,
        "endDate": values.endDate,
        "formData": 'values',
        "formIdentity": values.formIdentity,
        "formSubmitData": values.formSubmitData,
        "prevReview": values.prevReview,
        "ratings": values.ratings,  
        "sectionKey": values.sectionKey,
        "startDate": values.startDate,
        "status": values.status,
        "userName": values.userName,
        "userUpdateFlag": values.userUpdateFlag
      }
    );
  }

}
