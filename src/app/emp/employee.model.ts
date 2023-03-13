export enum Position{
  Admin,
  Supervisor,
  Employee
}

export enum FWAStatus{
  WorkFromHome,
  FlexiHour,
  Hybrid,
  None
}

export enum Status{
  NEW,
  NONE
}

export interface Employee {
  employeeID: string;
  password: string;
  name: string;
  position: Position;
  email: string;
  FWAStatus: FWAStatus;
  Status: Status;
  comment: string;
  supervisorID: string;
  deptID : string;
}

export interface Department {
  deptID: string;
  deptName: string;
}
