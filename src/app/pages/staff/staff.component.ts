import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Staff } from 'src/app/interfaces/staff';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  public staffForm: FormGroup;
  public staffData: Array<Staff>;
  public prevstaffData: any;
  public errorMessage = false;
  public buttonLabel = 'save';
  public updateId;

  constructor(
    public formBuilder: FormBuilder,
    private readonly staffService: StaffService
  ) {
   }

   private loadStaffs() {
    this.staffData = this.staffService.getAllStafs();
   }

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '', [ Validators.required ] ],
      jobTitle: [ '', [ Validators.required ] ],
    });
    this.loadStaffs();
  }

  staffformaction() {
    const firstName = this.staffForm.controls.firstName.value;
    const lastName = this.staffForm.controls.lastName.value;
    const jobTitle = this.staffForm.controls.jobTitle.value;
    if ( ! this.staffForm.valid ) {
      this.errorMessage = true;
      return;
    } else {
      this.errorMessage = false;
    }

    const staffInfo: Staff = {
      firstname : firstName,
      lastname : lastName,
      jobtitle : jobTitle,
      id: this.updateId || Date.now()
    };

    if ( this.updateId === 0 || this.updateId ) {
      this.staffService.updateStaff(staffInfo);
      this.updateId = '';
      this.buttonLabel = 'Save';
    } else {
      staffInfo.createdDate = Date.now();
      this.staffService.addNewStaff(staffInfo);
    }
    this.staffForm.reset();
    this.loadStaffs();
}

  editStaff( id: number ) {
    const staff: Staff = this.staffService.getStaffDetail(id);
    this.updateId = id;
    this.buttonLabel = 'Update';
    this.staffForm = this.formBuilder.group({
      firstName: [ staff.firstname, [ Validators.required ] ],
      lastName: [ staff.lastname, [ Validators.required ] ],
      jobTitle: [ staff.jobtitle, [ Validators.required ] ],
    });
  }

  deleteStaff( id ) {
    if (confirm('Are you sure?')) {
      this.staffService.deleteStaff(id);
      this.loadStaffs();
    }
  }
}
