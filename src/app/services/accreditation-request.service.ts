import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthStore } from '../stores/auth/auth-store';

@Injectable({
  providedIn: 'root'
})
export class AccreditationRequestService {

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

  getAllAccreditationRequests() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllAccreditations`;
    console.log("VALUES FOR SME IN SERVICE:---", this.authToken);
    return this._httpClient.get(
      url,
      // this.httpOptions
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
      },
      this.httpOptions
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
      },
      this.httpOptions
    );
  }

  addEligibilityRequest(data, template) {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility/add`;
    return this._httpClient.post(
      url,
      {
        "data": data,
        "template": template,
      }
    );
  }

  getEligibilityRequest() {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility`;
    return this._httpClient.get(
      url
    );
  }
  
  getSingleEligibilityRequest(id) {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility/${id}`;
    return this._httpClient.get(
      url
    );
  }

}
