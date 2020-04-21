import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from "./config";

@Injectable({
  providedIn: 'root'
})
export class AccreditationReviewsService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getAllAccreditationReviews(username, sectionKey) {
    const url = `${AppConfig.apiUrl}/accreditation/getAccreditationsSectionReviews`;
    return this._httpClient.put(
      url,
      {
        sectionKey: sectionKey,
        username: username
      }
    );
  }
  
  getLastestAccreditationReviews(username, sectionKey) {
    const url = `${AppConfig.apiUrl}/accreditation/getLatestAccredSectionReviews`;
    return this._httpClient.put(
      url,
      {
        sectionKey: sectionKey,
        username: username
      }
    );
  }

  getAllReviews() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllSectionReviews`;
    return this._httpClient.get(
      url
    );
  }

  addReview(formList, ratings, username, sectionKey, generalComments, status) {
    const url = `${AppConfig.apiUrl}/accreditation/addReview`;
    console.log("ADD REVIEW IN SERVICE:--", {
      "comments": generalComments,
      "compReviewCreateRequestList": formList,
      "rating": ratings,
      "sectionKey": sectionKey,
      "sectionReviewer": null,
      "status": status,
      "username": username,
    })
    return this._httpClient.post(
      url,
      {
        "comments": generalComments,
        "compReviewCreateRequestList": formList,
        "rating": ratings,
        "sectionKey": sectionKey,
        "sectionReviewer": null,
        "status": status,
        "username": username,
      }
    );
  }
}
