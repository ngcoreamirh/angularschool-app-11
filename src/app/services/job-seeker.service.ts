import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse } from '../models/response.interface';
import { IJobSeeker } from '../models/job-seeker.interface';
import { APP_CONFIG } from '../common/app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  jobSeekerSubject: BehaviorSubject<IJobSeeker> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  getJobSeeker(): Observable<IResponse<IJobSeeker>> {
    return this._httpClient.get<IResponse<IJobSeeker>>(APP_CONFIG.API_URL + 'jobSeeker');
  }

  createJobSeeker(_jobSeeker: IJobSeeker): Observable<IResponse<IJobSeeker>> {
    return this._httpClient.post<IResponse<IJobSeeker>>(APP_CONFIG.API_URL + 'jobSeeker/create', _jobSeeker);
  }

  removeJobSeeker(): Observable<IResponse<any>> {
    return this._httpClient.delete<IResponse<any>>(APP_CONFIG.API_URL + 'jobSeeker/remove');
  }

  uploadFiles(_files: File[]): Observable<IResponse<any>> {
    let formData = new FormData();
    [..._files].forEach((_file) => {
      formData.append("files", _file, _file.name);
    });
    return this._httpClient.post<IResponse<any>>(APP_CONFIG.API_URL + 'upload', formData);
  }

  updateJobSeekerSubject(_jobSeeker: IJobSeeker) {
    this.jobSeekerSubject.next(_jobSeeker);
  }

}
