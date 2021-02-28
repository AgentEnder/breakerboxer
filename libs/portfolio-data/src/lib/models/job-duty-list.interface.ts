import { BulletPoint } from './bullet-point.interface';
import { JobTitle } from './job-title.interface';
import { Document } from './document.interface';

export interface JobDutyList {
  titles: JobTitle[];
  bullets: BulletPoint[];
  documents?: Document[];
}
