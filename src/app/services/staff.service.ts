import { Injectable } from '@angular/core';
import { Staff } from '../interfaces/staff';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(
    private readonly storageService: StorageService
  ) { }

  public getAllStafs(): Array<Staff> {
    const staffString: string = this.storageService.get('staffs');
    if (staffString) {
      return JSON.parse(staffString) as Array<Staff>;
    }
    return [];
  }

  public addNewStaff(staff: Staff): Staff {
    let staffs: Array<Staff> = this.getAllStafs();
    if (!staffs.length) {
      staffs = [];
    }
    staffs.push(staff);
    this.storageService.set('staffs', staffs);
    return staff;
  }

  public updateStaff(staff: Staff): Staff {
    const staffs: Array<Staff> = this.getAllStafs();
    if (staffs.length) {
      const staffDetail: Staff = staffs.find((filteredStaff) => filteredStaff.id === staff.id);
      if (staffDetail) {
        Object.assign(staffDetail, staff);
        this.storageService.set('staffs', staffs);
      }
    }
    return staff;
  }

  public getStaffDetail(staffID: number): Staff {
    const staffs: Array<Staff> = this.getAllStafs();
    if (staffs.length) {
      return staffs.find((staff) => staff.id === staffID);
    }
    return null;
  }

  public deleteStaff(staffID: number): boolean {
    const staffs: Array<Staff> = this.getAllStafs();
    if (staffs.length) {
      const filteredStaffs: Array<Staff> =  staffs.filter((staff) => staff.id !== staffID);
      this.storageService.set('staffs', filteredStaffs);
      return true;
    }
    return false;
  }

}
