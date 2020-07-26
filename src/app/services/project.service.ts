import { Injectable } from '@angular/core';
import { AppConfig } from "./config";
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getGmProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/`;
    return this._httpClient.get(
      url,
    );
  }

  getGiaProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/?status=GIA`;
    return this._httpClient.get(
      url,
    );
  }

  getCeoProjects() {
    const url = `${AppConfig.apiUrl}/project-proposal/`;
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

  assignProposalSectionTasks(sectionId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/section/${sectionId}/task/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitProposalSectionReview(sectionId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/section/${sectionId}/review/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitProposalGeneralReview(id, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}/comment/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  markToGm(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=MARKED_TO_GM`;
    const status = 'MARKED_TO_GM';
    return this._httpClient.put(
      url,
      null
    );
  }

  markToCeo(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=MARKED_TO_CEO`;
    const status = 'MARKED_TO_GM';
    return this._httpClient.put(
      url,
      null
    );
  }

  setProjectStage(id, stage) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=${stage}`;
    const status = 'MARKED_TO_GM';
    return this._httpClient.put(
      url,
      null
    );
  }

  approvePreApparisalByGm(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=APPROVED`;
    return this._httpClient.put(
      url,
      null
    );
  }

  disapprovePreApparisalByGm(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=REJECTED`;
    return this._httpClient.put(
      url,
      null
    );
  }

  approveExtApparisalByGm(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=APPROVED`;
    return this._httpClient.put(
      url,
      null
    );
  }


  disapproveExtApparisalByGm(id) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}?status=REJECTED`;
    return this._httpClient.put(
      url,
      null
    );
  }

  getCostingHeads() {
    const url = `${AppConfig.apiUrl}/setting/cost-head`;
    return this._httpClient.get(
      url
    );
  }

  addCostingHeads(data) {
    const url = `${AppConfig.apiUrl}/setting/cost-head/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitPip(data, proposalId) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/pip/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitGia(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/gia/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitGiaReview(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/gia/review/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  submitGiaChecklist(proposalId, data) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/gia-checklist/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }

  appriveGia(proposalId, date) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/gia?status=APPROVED&checklist-deadline=${date}`;
    return this._httpClient.put(
      url,
      null
    );
  }

  uploadFiles(id, stage, file) {
    const url = `${AppConfig.apiUrl}/project-proposal/${id}/attachment/add?stage=${stage}`;
    let body = {
      file: file,
    }
    let header = new HttpHeaders()
    header.append("Content-Type", "multipart/form-data;")
    return this._httpClient.post(
      url,
      file,
      {
        headers: header
      }
    );
  }

  // SUB PROJECT DOCUMENT
  commenceSubProjectDoc(proposalId) {
    const url = `${AppConfig.apiUrl}/implementation/${proposalId}/sub-proj-doc/commence`;
    return this._httpClient.post(
      url,
      null
    );
  }

  getSubProjectDoc() {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc`;
    return this._httpClient.get(
      url
    );
  }

  getPendingSubProjectDoc() {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc/pending`;
    return this._httpClient.get(
      url
    );
  }

  singleSubProjectDoc(id) {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc/${id}`;
    return this._httpClient.get(
      url
    );
  }

  submitSubProjectDocSection(subProjectDocumentId, data) {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc/${subProjectDocumentId}/section/submit`;
    return this._httpClient.post(
      url,
      data
    );
  }

  requestSubProjectDocReview(sectionId) {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc/section/${sectionId}/request-review`;
    return this._httpClient.put(
      url,
      null
    );
  }

  submitSubProjectDocReview(sectionId, data) {
    const url = `${AppConfig.apiUrl}/implementation/sub-proj-doc/section/${sectionId}/review/add`;
    return this._httpClient.post(
      url,
      data
    );
  }

  commenceQPR(proposalId) {
    const url = `${AppConfig.apiUrl}/qpr/commence/?proposalId=${proposalId}`;
    return this._httpClient.post(
      url,
      null
    );
  }

  reassignProposalToFIP(proposalId, sectionIds) {
    const url = `${AppConfig.apiUrl}/project-proposal/${proposalId}/reassign`;
    return this._httpClient.post(
      url,
      sectionIds
    );
  }


}
