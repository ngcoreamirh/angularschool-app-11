import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJobSeeker } from '../../models/job-seeker.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PannelsEnum } from '../../models/pannels.enum';
import { customValidators } from '../../custom-validators';
import { JobSeekerService } from '../../services/job-seeker.service';
import { Subscription } from 'rxjs';
import { RegistrationStatusEnum } from '../../models/registration-status.enum';
import { APP_FUNCTIONS } from '../../common/app-functions';
import { APP_CONFIG } from '../../common/app-config';

@Component({
  selector: 'app-register-job-seeker',
  templateUrl: './register-job-seeker.component.html',
  styleUrls: ['./register-job-seeker.component.scss']
})
export class RegisterJobSeekerComponent implements OnInit, OnDestroy {

  FormStepOne: FormGroup;
  FormStepTwo: FormGroup;
  FormStepThree: FormGroup;
  isShowLoading: boolean;
  activeStep: number;
  bankName: string;
  resumeFiles: File[];
  isUploadAllowed = true;
  panelsEnum = PannelsEnum;
  private _subscription: Subscription;

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _jobSeekerService: JobSeekerService) { }

  ngOnInit() {
    this._setFormGroup();
    this._loadData();
  }

  private _setFormGroup() {
    this.FormStepOne = this._formBuilder.group({
      jobSeekerName: [
        null,
        Validators.required
      ],
      mobileNumber: [
        null,
        [
          Validators.required,
          customValidators.mobileValidator
        ]
      ]
    });
    this.FormStepTwo = this._formBuilder.group({
      isWorkExperience: [
        null,
        Validators.required
      ],
      resumeFileNames: [
        null
      ]
    });
    this.FormStepThree = this._formBuilder.group({
      panel: [
        null,
        Validators.required
      ],
      bankCardNumber: [
        null,
        [Validators.minLength(16), customValidators.bankNotFound]
      ]
    });
  }

  private _loadData() {
    this._subscription = this._jobSeekerService.jobSeekerSubject.subscribe((_jobSeeker) => {
      if (_jobSeeker?.registrationStatus === RegistrationStatusEnum.FINAL) {
        this._router.navigate(['']);
      }
      this._setDatas(_jobSeeker);
    });
  }

  private _setDatas(_jobSeeker: IJobSeeker) {
    this.FormStepOne.patchValue({ ..._jobSeeker });
    this.FormStepTwo.patchValue({ ..._jobSeeker });
    this.FormStepThree.patchValue({ ..._jobSeeker });

    this._setFormGroupValuesChange();
    this._setActiveStep();
    this.setbankName(APP_FUNCTIONS.getBankCardName(_jobSeeker?.bankCardNumber));
    this.isUploadAllowed = (_jobSeeker?.resumeFileNames?.length > 0) ? false : true;
  }

  private _setFormGroupValuesChange() {
    this.FormStepTwo.get('isWorkExperience').valueChanges.subscribe((_isWorkExperience) => {
      if (_isWorkExperience) {
        this.FormStepTwo.get('resumeFileNames').addValidators(Validators.required);
      } else {
        this.FormStepTwo.get('resumeFileNames').clearValidators();
      }
      this.FormStepTwo.get('resumeFileNames').updateValueAndValidity();
    });

    this.FormStepThree.get('panel').valueChanges.subscribe((_panel) => {
      if (_panel == PannelsEnum[PannelsEnum.GRAY]) {
        this.FormStepThree.get('bankCardNumber').clearValidators();
      } else {
        this.FormStepThree.get('bankCardNumber')
          .addValidators([Validators.required, Validators.minLength(16), customValidators.bankNotFound]);
      }
      this.FormStepThree.get('bankCardNumber').updateValueAndValidity();
    })
  }

  private _setActiveStep() {
    (this.isFormStepThreeHasValue()) ? this.activeStep = 4 :
      (this.isFormStepTwoHasValue()) ? this.activeStep = 3 :
        (this.isFormStepOneHasValue()) ? this.activeStep = 2 : this.activeStep = 1;
  }

  setbankName(_bankName: string) {
    if (!_bankName) {
      this.bankName = "";
    } else {
      this.bankName = _bankName;
    }
  }

  isFormStepThreeHasValue() {
    return Object.values(this.FormStepThree.value).map(value => value).some(value => value !== null);
  }

  isFormStepTwoHasValue() {
    return Object.values(this.FormStepTwo.value).map(value => value).some(value => value !== null);
  }

  isFormStepOneHasValue() {
    return Object.values(this.FormStepOne.value).map(value => value).some(value => value !== null);
  }

  previousClick() {
    (this.activeStep == 1) ? this._router.navigate(['']) : this.activeStep--;
  }

  nextClick() {
    if (this.activeStep == 1 && this.FormStepOne.valid) {
      this.activeStep++;
      return;
    } else {
      this.FormStepOne.markAllAsTouched();
    }

    if (this.activeStep == 2 && this.FormStepTwo.valid) {
      this.activeStep++;
      return;
    } else {
      this.FormStepTwo.markAllAsTouched();
    }

    if (this.activeStep == 3 && this.FormStepThree.valid) {
      this.activeStep++;
      return;
    } else {
      this.FormStepThree.markAllAsTouched();
    }
  }

  onTemporaryRegistrationClick() {
    let forms_must_checks_is_valid: any[] = [];
    (this.activeStep == 1) ? forms_must_checks_is_valid.push(this.FormStepOne.valid) :
      (this.activeStep == 2) ? forms_must_checks_is_valid.push(this.FormStepTwo.valid) :
        (this.activeStep == 3) ? forms_must_checks_is_valid.push(this.FormStepThree.valid) : null;

    (this.isFormStepOneHasValue()) ? forms_must_checks_is_valid.push(this.FormStepOne.valid) : null;
    (this.isFormStepTwoHasValue()) ? forms_must_checks_is_valid.push(this.FormStepTwo.valid) : null;
    (this.isFormStepThreeHasValue()) ? forms_must_checks_is_valid.push(this.FormStepThree.valid) : null;

    if (forms_must_checks_is_valid.every(is_valid => is_valid === true)) {
      this._jobseekerRegistration(RegistrationStatusEnum.TEMPORARY);
    } else {
      alert('برخی اطلاعات به درستی وارد نشده است');
      (this.activeStep == 1) ? this.FormStepOne.markAllAsTouched() :
        (this.activeStep == 2) ? this.FormStepTwo.markAllAsTouched() :
          (this.activeStep == 3) ? this.FormStepThree.markAllAsTouched() : null;
    }
  }

  onFinalRegistrationClick() {
    this._jobseekerRegistration(RegistrationStatusEnum.FINAL);
  }

  onFilesUploaded(_files: File[]) {
    if (this._isFilesInAllowedType(_files) && this._isFilesInAllowedSize(_files)) {
      let form_files = this.resumeFiles;
      if (this._isFilesInAllowedLength(_files)) {
        this.resumeFiles = form_files ? [...form_files, ..._files] : [..._files];
        this.FormStepTwo.patchValue({
          resumeFileNames: [...this.resumeFiles].map(file => file.name)
        });
        this.FormStepTwo.updateValueAndValidity();
      } else {
        alert(APP_CONFIG.FILES_LENGTH_ERROR_MESSAGE);
      }
    } else {
      alert(APP_CONFIG.FILES_Validate_ERROR_MESSAGE);
    }
  }

  // قبل از آپلود
  removeFile(_file: File) {
    this.resumeFiles.splice(this.resumeFiles.findIndex(resume_file => resume_file == _file), 1);
    this.FormStepTwo.patchValue({
      resumeFileNames: [...this.resumeFiles].map(file => file.name)
    });
    this.FormStepTwo.updateValueAndValidity();
  }

  // بعد از آپلود
  removeFiles() {
    this.resumeFiles = null;
    this.FormStepTwo.patchValue({
      resumeFileNames: null
    });
    this.FormStepTwo.updateValueAndValidity();
    this.isUploadAllowed = true;
  }

  onPanelSelected(_panelEnum) {
    if (this.FormStepThree.get('panel').value == this.panelsEnum[_panelEnum]) {
      this.FormStepThree.patchValue({
        panel: null
      });
    } else {
      this.FormStepThree.patchValue({
        panel: this.panelsEnum[_panelEnum]
      });
    }
    this.FormStepThree.updateValueAndValidity();
  }

  private _jobseekerRegistration(_registrationStatusEnum) {
    this.isShowLoading = true;
    let job_seeker: IJobSeeker = {
      ...this.FormStepOne.value,
      ...this.FormStepTwo.value,
      ...this.FormStepThree.value,
      registrationStatus: _registrationStatusEnum
    };

    if (!job_seeker.isWorkExperience) {
      job_seeker.resumeFileNames = null;
    }

    if (job_seeker.panel?.toString() == PannelsEnum[PannelsEnum.GRAY]) {
      job_seeker.bankCardNumber = null;
    }

    if (this.resumeFiles) {
      this._jobSeekerService.uploadFiles(this.resumeFiles).subscribe((_res) => {
        this.resumeFiles = null;
        job_seeker.resumeFileNames = _res.data;
        this._jobSeekerService.createJobSeeker(job_seeker).subscribe((_res) => {

          this.isShowLoading = false;
          alert(_res.message);
          this._jobSeekerService.updateJobSeekerSubject(_res.data);

        }, _error => APP_FUNCTIONS.handleError(_error, () => {
          this.isShowLoading = false;
        }));
      }, _error => APP_FUNCTIONS.handleError(_error, () => {
        this.isShowLoading = false;
      }));
    } else {
      this._jobSeekerService.createJobSeeker(job_seeker).subscribe((_res) => {
        alert(_res.message);
        this.isShowLoading = false;
        this._jobSeekerService.updateJobSeekerSubject(_res.data);
      }, _error => APP_FUNCTIONS.handleError(_error, () => {
        this.isShowLoading = false;
      }));
    }

  }

  private _isFilesInAllowedType(_files: File[]): boolean {
    let is_allowed = (_file: File) => {
      return (APP_CONFIG.ALLOWED_FILES_TYPE.some(allowed_type => allowed_type == _file.type));
    }
    return [..._files].every(is_allowed);
  }

  private _isFilesInAllowedSize(_files: File[]): boolean {
    let is_allowed = (_file: File) => {
      let size_in_MB = Number.parseInt((_file.size / (1024 * 1024)).toFixed(2));
      return (size_in_MB < 3);
    }
    return [..._files].every(is_allowed);
  }

  private _isFilesInAllowedLength(_files: File[]): boolean {
    return (((this.resumeFiles?.length || 0) + _files?.length) <= 3);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}