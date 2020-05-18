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

  updateAccreditationRequest(id, status) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/${id}?status=${status}`;
    console.log("VALUES FOR SME IN SERVICE:---", status);
    return this._httpClient.put(
      url,
      null
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

  getUnderReviewEligibilityRequest() {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility?status=UNDER_REVIEW`;
    return this._httpClient.get(
      url
    );
  }

  getApprovedEligibilityRequest() {
    const url = `${AppConfig.apiUrl}/accreditation/eligibility?status=APPROVED`;
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

  getQulificationRequests() {
    const url = `${AppConfig.apiUrl}/accreditation/qualification`;
    return this._httpClient.get(
      url
    );
  }

  getUnderReviewQulificationRequests() {
    const url = `${AppConfig.apiUrl}/accreditation/qualification?status=UNDER_REVIEW`;
    return this._httpClient.get(
      url
    );
  }

  getApprovedQulificationRequests() {
    const url = `${AppConfig.apiUrl}/accreditation/qualification?status=APPROVED`;
    return this._httpClient.get(
      url
    );
  }

  addQulificationRequest(values, id) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/${id}/section/add?action=SAVE`;
    return this._httpClient.post(
      url,
      values
    );
  }

  updateQulificationRequest(values, id) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/${id}/section/add?action=SUBMIT`;
    return this._httpClient.post(
      url,
      values
    );
  }
  
  assignTaskToSme(values, sectionId) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/section/${sectionId}/task/add`;
    return this._httpClient.post(
      url,
      values
    );
  }

  getSingleQualificationRequest(id) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/${id}`;
    return this._httpClient.get(
      url
    );
  }

  getSmeTasks() {
    const url = `${AppConfig.apiUrl}/task/`;
    return this._httpClient.get(
      url
    );
  }
  
  reassignFipSection(id, values){
    const url = `${AppConfig.apiUrl}/accreditation/qualification/${id}/reassign`;
    return this._httpClient.post(
      url, 
      values
    );

  }
}
