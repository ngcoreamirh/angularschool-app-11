import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APP_FUNCTIONS } from 'src/app/common/app-functions';
import { IJobSeeker } from 'src/app/models/job-seeker.interface';
import { RegistrationStatusEnum } from 'src/app/models/registration-status.enum';
import { JobSeekerService } from 'src/app/services/job-seeker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobSeeker: IJobSeeker;
  isShowLoading: boolean;
  isShowJobSeeker: boolean;
  registrationStatus = RegistrationStatusEnum;
  private _subscription: Subscription;

  constructor(private _jobSeekerService: JobSeekerService) { }

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData() {
    this._subscription = this._jobSeekerService.jobSeekerSubject.subscribe((_jobSeeker) => {
      this.jobSeeker = _jobSeeker;
    });
  }

  onShowJobSeekerClick() {
    this.isShowJobSeeker = true;
  }

  onRemoveJobSeekerClick() {
    let is_removed = confirm("اطلاعات شما حذف می شود، مطمئن هستید؟");
    if (is_removed) {
      this.isShowLoading = true;
      this._jobSeekerService.removeJobSeeker().subscribe((_res) => {
        alert(_res.message);
        this._jobSeekerService.updateJobSeekerSubject(null);
        this.isShowLoading = false;
      }, _error => APP_FUNCTIONS.handleError(_error, () => {
        this.isShowLoading = false;
      }));
    }
  }

  onISeeClick() {
    this.isShowJobSeeker = false;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
