import { Component, OnInit } from '@angular/core';
import { Staff } from '../staff';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Storagehelper} from '../../providers/storagehelper';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
    staff: Staff = {
        id: 1,
        name: 'Naren',
        jobtitle: 'IT'
    };

    staffForm: FormGroup;
    public staffData: any;
    public prevstaffData: any;
    public errorMessage = false;
    public buttonLabel = 'save';
    public updateId;

    constructor(
        public formBuilder: FormBuilder,
        private storageHelper: Storagehelper
    ) {
        this.getStaffData();
    }

    ngOnInit() {
        this.staffForm = this.formBuilder.group({
            staffName: [ '', [ Validators.required ] ],
        });
    }

    getStaffData() {
        const staffStorageData = this.storageHelper.getStorageItem( 'staffDetail' ) || false;

        if ( staffStorageData ) {
            this.staffData = staffStorageData;
        }
    }

    staffformaction() {
        const staffName = this.staffForm.controls.staffName.value;
        if ( ! this.staffForm.valid ) {
            this.errorMessage = true;
            return;
        } else {
            this.errorMessage = false;
        }

        const staffInfo = [{
            staff : staffName,
        }];

        if ( this.updateId === 0 || this.updateId ) {

            this.prevstaffData = this.storageHelper.getStorageItem( 'staffDetail' ) || false;

            if ( this.prevstaffData ) {
                this.prevstaffData[ this.updateId ].staff = staffName;

                this.storageHelper.setStorageItem( 'staffDetail', this.prevstaffData );
                this.staffForm.reset();
            }

            // Reset staffData array
            this.getStaffData();

            this.updateId = '';
            this.buttonLabel = 'save';
        } else {
            this.prevstaffData = this.storageHelper.getStorageItem( 'staffDetail' ) || false;

            if ( this.prevstaffData ) {
                const combinedData = [ ...this.prevstaffData, ...staffInfo ];

                this.storageHelper.setStorageItem( 'staffDetail', combinedData );
                this.staffForm.reset();
            } else {
                this.storageHelper.setStorageItem( 'staffDetail', staffInfo );
                this.staffForm.reset();
            }

            // Reset staffData array
            this.getStaffData();
        }
    }

    editStaff( index ) {
        this.getStaffData();

        this.updateId = index;
        this.buttonLabel = 'update';
        this.staffForm = this.formBuilder.group({
            staffName: [ this.staffData[ index ].staff, [ Validators.required ] ],
        });
    }

    deleteStaff( index ) {
        const staffStorageData = this.storageHelper.getStorageItem( 'staffDetail' ) || false;

        if ( staffStorageData ) {
            staffStorageData.splice( index, 1 );
            this.storageHelper.setStorageItem( 'staffDetail', staffStorageData );

            // Reset staffData array
            this.getStaffData();
        }
    }
}
