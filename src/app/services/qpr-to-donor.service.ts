import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QprToDonorService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getAllRequests() {
    const url = `${AppConfig.apiUrl}/qpr-to-donor/`;
    return this._httpClient.get(
      url,
    );
  }

  commenceQprToDonorRequest() {
    const url = `${AppConfig.apiUrl}/qpr-to-donor/commence`;
    return this._httpClient.post(
      url,
      null
    );
  }

  getQprToDonorRequest(id) {
    const url = `${AppConfig.apiUrl}/qpr-to-donor/${id}`;
    return this._httpClient.get(
      url,
    );
  }

  addProjectRequest(data, id) {
    const url = `${AppConfig.apiUrl}/qpr-to-donor/${id}/section/add?action=SAVE`;
    return this._httpClient.post(
      url,
      data
    );
  }
}
