import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrantDisbursmentsService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getGrantDisbursments() {
    const url = `${AppConfig.apiUrl}/grant-disbursement/`;
    return this._httpClient.get(
      url,
    );
  }

  getSingleGrantDisbursment(id) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${id}`;
    return this._httpClient.get(
      url,
    );
  }

  submitInitialAdvance(disbursmentId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/initial-advance/submit`;
    return this._httpClient.put(
      url,
      body
    );
  }

  assignInitialAdvanceReviews(disbursmentId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/assign/reviews/`;
    return this._httpClient.post(
      url,
      body
    );
  }

  submitInitialAdvanceReview(disbursmentId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/submit/review/`;
    return this._httpClient.put(
      url,
      body
    );
  }

  submitQuarterAdvance(disbursmentId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/quarter-advance/submit/`;
    return this._httpClient.put(
      url,
      body
    );
  }

  assignQuarterAdvanceReviews(disbursmentId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/quarter-advance/assign/reviews/`;
    return this._httpClient.post(
      url,
      body
    );
  }


  approveInitialAdvance(disbursmentId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/initial-advance/approve`;
    return this._httpClient.put(
      url,
      null
    );
  }

  approveQuarterAdvance(advanceId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${advanceId}/quarter-advance/approve`;
    return this._httpClient.put(
      url,
      null
    );
  }

}