// user-allowed.model.ts

export class UserAllowed {
    document: string = '';
    name: string = '';
    userAllowedType: UserType = new UserType();
    documentType: DocumentType = new DocumentType();
    email: string = '';
  }
  
  export class UserType {
    description: string = '';
  }
  
  export class DocumentType {
    description: string = '';
  }
  
  export class AuthRange {
    neighbor_Id: number = 0;
    initDate: string = '';
    endDate: string = '';
    allowedDays: AllowedDay[] = [new AllowedDay()];
  }
  
  export class AllowedDay {
    day: string = '';
    init_date: string = '';
    end_date: string = '';
  }
  
  export class Vehicle {
    vehicleTypeId: vehicleTypeId = new vehicleTypeId();
    plate: string = '';
    insurance: string = '';
  }
  
  export class vehicleTypeId {
    description: string = '';
  }
  