export enum WorkHours {
  eight = "8am - 4pm",
  nine = "9am - 5pm",
  ten = "10am - 6pm"
}

export interface DailySchedule {
  employeeID: string;
  workLocation: string;
  workHours: WorkHours;
  workReport: string;
  supervisorComments: string;
}
