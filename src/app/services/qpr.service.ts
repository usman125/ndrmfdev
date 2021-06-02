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

  saveSection(id, body) {
    const url = `${AppConfig.apiUrl}/qpr/${id}/section/submit?action=SAVE`;
    return this._httpClient.post(
      url,
      body
    );
  }

  submitSection(id, body) {
    const url = `${AppConfig.apiUrl}/qpr/${id}/section/submit?action=SUBMIT`;
    return this._httpClient.post(
      url,
      body
    );
  }

  addTaskForSection(sectionId, body) {
    const url = `${AppConfig.apiUrl}/qpr/section/${sectionId}/task/add`;
    return this._httpClient.post(
      url,
      body
    );
  }

  addTasksForQpr(qprId, body) {
    const url = `${AppConfig.apiUrl}/qpr/${qprId}/tasks/add`;
    return this._httpClient.post(
      url,
      body
    );
  }

  addReview(sectionId, body) {
    const url = `${AppConfig.apiUrl}/qpr/section/${sectionId}/review/add`;
    return this._httpClient.post(
      url,
      body
    );
  }

  
  addReviewForQprTask(taskId, body) {
    const url = `${AppConfig.apiUrl}/qpr/${taskId}/review/add`;
    return this._httpClient.post(
      url,
      body
    );
  }




}