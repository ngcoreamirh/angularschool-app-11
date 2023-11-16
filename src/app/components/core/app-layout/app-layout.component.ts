import { Component, OnInit } from '@angular/core';
import { APP_FUNCTIONS } from 'src/app/common/app-functions';
import { JobSeekerService } from 'src/app/services/job-seeker.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  isShowLoading: boolean;

  constructor(private _jobSeekerService: JobSeekerService) { }

  ngOnInit() {
    this._loadData();
  }

  private _loadData() {
    this.isShowLoading = true;
    this._jobSeekerService.getJobSeeker().subscribe((_res) => {
      this._jobSeekerService.updateJobSeekerSubject(_res.data);
      this.isShowLoading = false;
    }, _error => APP_FUNCTIONS.handleError(_error, () => {
      this.isShowLoading = false;
    }))
  }

}
