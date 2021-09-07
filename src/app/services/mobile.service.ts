import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MobileService {


  authToken: any = null;
  httpOptions: any = null;

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getActivitiesForProposal(proposalId) {
    const url = `${AppConfig.apiUrl}/mobile/${proposalId}/proposal/activities`;
    return this._httpClient.get(
      url,
    );
  }

}
