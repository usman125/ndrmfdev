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


  getAllProjects(){
    const url = `${AppConfig.apiUrl}/project-proposal/`;
    return this._httpClient.get(
      url,
    );
  }
  
  getPoProjects(){
    const url = `${AppConfig.apiUrl}/project-proposal/?status=UNDER_REVIEW`;
    return this._httpClient.get(
      url,
    );
  }
  
  commenceNewProjects(values){
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

  getSingleProject(id){
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
}
