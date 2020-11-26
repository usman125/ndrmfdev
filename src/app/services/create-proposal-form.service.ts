import { Injectable } from '@angular/core';
import { API_URL, LOCAL_API_URL } from "../api/AppApi";
import { ajax } from 'rxjs/ajax';


@Injectable({
  providedIn: 'root'
})
export class CreateProposalFormService {

  constructor() { }

  addForm(
    name: string,
    smeRef: string,
    components: any,
    type: string,
    page: number,
    numPages: number,
  ) {
    const query = ajax({
      url: LOCAL_API_URL + '/addform',
      // url: API_URL + '/addform',
      method: 'POST',
      headers: {
        /*some headers*/
      },
      body: {
        title: name,
        smeRef: smeRef,
        components: JSON.stringify(components),
        // components: components,
        type: type,
        page: page,
        numPages: numPages,
      }
    });
    return query;
  }

  allForms() {
    const query = ajax({
      url: LOCAL_API_URL + '/form',
      // url: API_URL + '/addform',
      method: 'GET',
      headers: {
        /*some headers*/
      },
      body: {
      }
    });
    return query;
  }
}
