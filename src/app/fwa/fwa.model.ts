export enum Status{
  Accepted,
  Rejected,
  Pending
}
export enum WorkType{
  WorkFromHome= "Work From Home",
  FlexiHour = "Flexi-Hour",
  Hybrid="Hybrid"
}
export interface FWA {
  requestID: string;
  requestDate: Date;
  workType: WorkType;
  description: string;
  reason: string;
  status: Status;
  comment: string;
}
