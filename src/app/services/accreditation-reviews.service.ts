import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "./config";

@Injectable({
  providedIn: "root",
})
export class AccreditationReviewsService {
  constructor(private _httpClient: HttpClient) {}

  getAllAccreditationReviews(username, sectionKey) {
    const url = `${AppConfig.apiUrl}/accreditation/getAccreditationsSectionReviews`;
    return this._httpClient.put(url, {
      sectionKey: sectionKey,
      username: username,
    });
  }

  getLastestAccreditationReviews(username, sectionKey) {
    const url = `${AppConfig.apiUrl}/accreditation/getLatestAccredSectionReviews`;
    return this._httpClient.put(url, {
      sectionKey: sectionKey,
      username: username,
    });
  }

  getAllReviews() {
    const url = `${AppConfig.apiUrl}/accreditation/getAllSectionReviews`;
    return this._httpClient.get(url);
  }

  addReview(sectionId, values) {
    const url = `${AppConfig.apiUrl}/accreditation/qualification/section/${sectionId}/review/add`;
    // console.log("ADD REVIEW IN SERVICE:--", )
    return this._httpClient.post(url, values);
  }
}
