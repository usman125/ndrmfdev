import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getAllProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/`;
    return this._httpClient.get(
      url,
    );
  }

  getPoProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/`;
    return this._httpClient.get(
      url,
    );
  }

  getDmPamProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/?status=PRELIMINARY_APPRAISAL`;
    return this._httpClient.get(
      url,
    );
  }

  getExtAppraisalProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/?status=EXTENDED_APPRAISAL`;
    return this._httpClient.get(
      url,
    );
  }

  commenceNewProjects(values) {
    console.log("----FINAL API OBJECT:----", {
      name: values.name,
      thematicAreaId: values.thematicAreaId,
      type: values.type
    })
    const url = `${AppConfig.apiUrl}/project-proposal/commence/`;
    return this._httpClient.post(
      url,
      {
        name: values.name,
        thematicAreaId: values.thematicAreaId,
        type: values.type
      }
    );
  }

  getSingleProject(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}`;
    return this._httpClient.get(
      url,
    );
  }

  addProjectRequest(data, id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}/section/add?action=SAVE`;
    return this._httpClient.post(
      url,
      data
    );
  }

  updateProjectRequest(data, id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}/section/add?action=SUBMIT`;
    return this._httpClient.post(
      url,
      data
    );
  }


  getPreAppraisalRequests() {
    const url = `${AppConfig.apiUrl}/project-proposal/pre-appraisal`;
    return this._httpClient.get(
      url,
    );
  }

  createPreAppraisalRequest(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/pre-appraisal/commence`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitPreAppraisal(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/pre-appraisal/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }

  createExtAppraisalRequest(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/ext-appraisal/commence`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitExtAppraisal(id, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/ext-appraisal/${id}/section/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }
  
  assignProposalSectionTasks(sectionId, data){
    const url = `${AppConfig.apiUrl}/project-proposal/section/${sectionId}/task/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitProposalSectionReview(sectionId, data){
    const url = `${AppConfig.apiUrl}/project-proposal/section/${sectionId}/review/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitProposalGeneralReview(id, data){
    const url = `${AppConfig.apiUrl}/project-proposal/${id}/comment/add`;
    return this._httpClient.post(
      url,
      data
    );
  }


}
