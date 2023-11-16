import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJobSeeker } from '../../models/job-seeker.interface';
import { PannelsEnum } from '../../models/pannels.enum';
import { APP_CONFIG } from '../../common/app-config';
import { APP_FUNCTIONS } from 'src/app/common/app-functions';

@Component({
  selector: 'app-show-job-seeker',
  templateUrl: './show-job-seeker.component.html',
  styleUrls: ['./show-job-seeker.component.scss']
})
export class ShowJobSeekerComponent implements OnInit {

  @Input('jobSeekerData') jobSeeker: IJobSeeker = {} as IJobSeeker;
  @Output() ISeeClick = new EventEmitter<any>();
  bankName: string;

  panelsEnum = PannelsEnum;
  private downloadServerURL: string = APP_CONFIG.API_URL + "download/";

  constructor() { }

  ngOnInit(): void {
    this.bankName = this.jobSeeker.bankCardNumber ? APP_FUNCTIONS.getBankCardName(this.jobSeeker.bankCardNumber) : '';
  }

  onDownloadResumeClick(_resumeFileName: string) {
    window.open(this.downloadServerURL +  _resumeFileName);
  }

  onISeeClicked() {
    this.ISeeClick.emit();
  }

}
