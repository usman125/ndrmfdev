import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getProcesses() {
    const url = `${AppConfig.apiUrl}/setting/process/types`;
    return this._httpClient.get(
      url,
    );
  }

  getProcessMeta(type) {
    const url = `${AppConfig.apiUrl}/setting/process/${type}/meta`;
    return this._httpClient.get(
      url,
    );
  }

  updateProcess(type, values) {
    console.log("VALUES IN API:---", values);
    const url = `${AppConfig.apiUrl}/setting/process/${type}/meta`;
    return this._httpClient.put(
      url,
      values
    );
  }

  getProcessTemplate(type) {
    const url = `${AppConfig.apiUrl}/setting/process/${type}/template`;
    return this._httpClient.get(
      url,
    );
  }

  getPendingSignups() {
    const url = `${AppConfig.apiUrl}/user/signup/requests/pending`;
    return this._httpClient.get(
      url,
    );
  }


  approveSignup(userId) {
    const url = `${AppConfig.apiUrl}/user/signup/requests/${userId}/approve`;
    return this._httpClient.get(
      url,
    );
  }

  addSectionTemplate(sectionId, values) {
    console.log("VALUES IN SERVICE:--", values);
    var template = {
      components: values.components,
      page: values.page,
      display: values.type,
      passingScore: values.passingScore,
      totalScore: values.totalScore
    }
    const url = `${AppConfig.apiUrl}/setting/section/${sectionId}/template/add`;
    return this._httpClient.post(
      url,
      {
        "enableAndEffective": true,
        "passingScore": values.passingScore,
        "template": JSON.stringify(template),
        "templateType": values.type,
        "totalScore": values.totalScore
      }
    );
  }

  // getAllSectionTemplates(){
  //   const url = `${AppConfig.apiUrl}/setting/section/${sectionId}/template/add`;
  //   return this._httpClient.post(
  //     url,
  //     {
  //       "enableAndEffective": true,
  //       "passingScore": values.passingScore,
  //       "template": JSON.stringify(values.components),
  //       "templateType": values.display,
  //       "totalScore": values.totalScore
  //     }
  //   );

  // }

  getAccrediattionCommence() {

    const url = `${AppConfig.apiUrl}/accreditation/qualification/commence`;
    return this._httpClient.get(
      url
    );
  }



}
