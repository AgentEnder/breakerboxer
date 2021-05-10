import { BulletPoint } from './bullet-point.interface';
import { Document } from './document.interface';
import { JobTitle } from './job-title.interface';

export interface JobDutyList {
  titles: JobTitle[];
  bullets: BulletPoint[];
  documents?: Document[];
}
