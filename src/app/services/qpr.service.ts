import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QprService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getSingleQPR(id) {
    const url = `${AppConfig.apiUrl}/qpr/${id}`;
    return this._httpClient.get(
      url,
    );
  }

  getQPRRequests() {
    const url = `${AppConfig.apiUrl}/qpr`;
    return this._httpClient.get(
      url,
    );
  }

  saveSection(id) {
    const url = `${AppConfig.apiUrl}/qpr/${id}/section/submit?action=SAVE`;
    return this._httpClient.post(
      url,
      null
    );
  }

  submitSection(id) {
    const url = `${AppConfig.apiUrl}/qpr/${id}/section/submit?action=SUBMIT`;
    return this._httpClient.post(
      url,
      null
    );
  }


}