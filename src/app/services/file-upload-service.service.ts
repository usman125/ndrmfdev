import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from "./config";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) { }

  upload(file: File, disbursmentId, type): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    let header = new HttpHeaders()
    header.append("Content-Type", "multipart/form-data;")

    let url = `${this.baseUrl}/grant-disbursement/${disbursmentId}/upload-file?type=${type}`

    const req = new HttpRequest(
      'POST',
      url,
      formData,
      { reportProgress: true, responseType: 'json', headers: header }
    );

    // return this.http.request(req);
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`, { reportProgress: true, responseType: 'json' });
  }
}