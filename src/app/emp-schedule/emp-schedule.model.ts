export enum workHours {
  eight = "8am - 4pm",
  nine = "9am - 5pm",
  ten = "10am - 6pm"
}

export interface dailySchedule {
  employeeID: string;
  workLocation: string;
  workHours: workHours;
  workReport: string;
  supervisorComments: string;
}
