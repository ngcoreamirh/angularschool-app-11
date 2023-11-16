import { PannelsEnum } from "./pannels.enum";
import { RegistrationStatusEnum } from "./registration-status.enum";

export interface IJobSeeker {
    jobSeekerName: string;
    mobileNumber: string;
    isWorkExperience: boolean;
    resumeFileNames?: string[];
    panel: PannelsEnum;
    bankCardNumber?: string;
    registrationStatus: RegistrationStatusEnum;
}