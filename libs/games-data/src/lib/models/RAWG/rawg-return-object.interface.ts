export interface PagedReturn<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
