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
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/initial-advance/approve?status=APPROVED`;
    return this._httpClient.put(
      url,
      null
    );
  }

  reassignInitialAdvance(disbursmentId, comments) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/initial-advance/reassign`;
    return this._httpClient.put(
      url,
      {
        comment: comments
      }
    );
  }


  approveQuarterAdvance(advanceId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${advanceId}/quarter-advance/approve?status=APPROVED`;
    return this._httpClient.put(
      url,
      null
    );
  }

  approveAdvanceLiquidation(liquidationId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/advance-liquidation/${liquidationId}/approve`;
    return this._httpClient.put(
      url,
      null
    );
  }

  reassignAdvanceLiquidation(liquidationId, comments) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/advance-liquidation/${liquidationId}/reassign`;
    return this._httpClient.put(
      url,
      {
        comment: comments
      }
    );
  }

  reassignQuarterAdvance(advanceId, comments) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/advance/${advanceId}/reassign`;
    return this._httpClient.put(
      url,
      {
        comment: comments
      }
    );
  }

  submitInitialAdvanceLiquidationWithSoes(liquidationId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/initial-advance/${liquidationId}/liquidation/submit`;
    return this._httpClient.post(
      url,
      body
    );
  }

  updateInitialAdvanceLiquidationWithSoes(liquidationId, body) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/initial-advance/${liquidationId}/liquidation/update`;
    return this._httpClient.put(
      url,
      body
    );
  }

  getFilesForAdvance(advanceId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/advance/${advanceId}/files`;
    return this._httpClient.get(
      url
    );
  }

  commenceInitialAdvanceLiquidation(disbursmentId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${disbursmentId}/initial-advance/commence/liquidation/`;
    return this._httpClient.post(
      url,
      null
    );
  }

  commenceQuarterAdvanceLiquidation(advanceId) {
    const url = `${AppConfig.apiUrl}/grant-disbursement/${advanceId}/quarter-advance/commence/liquidation/`;
    return this._httpClient.post(
      url,
      null
    );
  }

}