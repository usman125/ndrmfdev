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

  addProcess(processType, name) {
    const url = `${AppConfig.apiUrl}/setting/process/${processType}/sub-process-type/add?name=${name}`;
    return this._httpClient.post(
      url,
      null
    );
  }

  getProcessMeta(type) {
    const url = `${AppConfig.apiUrl}/setting/process/${type}/meta`;
    return this._httpClient.get(
      url,
    );
  }

  getSubProcessMeta(type) {
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

  getAllDepartments() {
    const url = `${AppConfig.apiUrl}/setting/department`;
    return this._httpClient.get(
      url,
    );
  }

  addDepartments(data) {
    const url = `${AppConfig.apiUrl}/setting/department/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  addSectionTemplate(sectionId, values) {
    console.log("VALUES IN SERVICE:--", values);
    var template = {
      components: values.components,
      page: values.page,
      display: values.type,
      passingScore: values.passingScore,
      totalScore: values.totalScore,
      name: values.name
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

  getAllThematicAreas() {
    const url = `${AppConfig.apiUrl}/setting/thematic-area`;
    return this._httpClient.get(
      url
    );
  }

  getSubProcessTypes(processType) {
    const url = `${AppConfig.apiUrl}/setting/process/${processType}/sub-process-type`;
    return this._httpClient.get(
      url
    );
  }

  addThematicArea(values) {
    let body = {
      "enabled": true,
      "name": values.name,
      "processOwnerId": null
    }
    const url = `${AppConfig.apiUrl}/setting/thematic-area/add`;
    return this._httpClient.post(
      url,
      body
    );
  }

  updateThematicArea(values, id) {
    const url = `${AppConfig.apiUrl}/setting/thematic-area/${id}/update`;
    return this._httpClient.put(
      url,
      values
    );
  }


  addDesignations(values) {
    const url = `${AppConfig.apiUrl}/setting/designation/add`;
    return this._httpClient.post(
      url,
      values
    );
  }

  getAllDesignations() {
    const url = `${AppConfig.apiUrl}/setting/designation`;
    return this._httpClient.get(
      url,
    );
  }



}
