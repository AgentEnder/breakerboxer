import { JobDutyList } from './job-duty-list.interface';

export interface Job {
  company: string;
  duties: JobDutyList[];
}

export const JobOrderComparator = (a: Job, b: Job) =>
  a.duties.some((duty) => duty.titles.some((title) => title.end === null));
export const GetEndDates = (j: Job) =>
  j.duties.reduce((arr, next) => [...arr, next.titles.map((x) => x.end)], []);
export const GetLatestDate = (d: Date[]) =>
  d.sort((a, b) => (a === null ? -1 : b === null ? 1 : b.valueOf() - a.valueOf()));
export const LastWorkDay = (j: Job) => GetLatestDate(GetEndDates(j));
export const ReverseChronolgicalJobOrder = (a, b) => {
  const aEnd = LastWorkDay(a);
  const bEnd = LastWorkDay(b);

  if (aEnd === bEnd) {
    return 0;
  } else if (aEnd === null) {
    return -1;
  } else if (bEnd === null) {
    return 1;
  } else {
    return b.valueOf() - a.valueOf();
  }
};
