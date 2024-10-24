import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'PostGraduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    public _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      gender: '',
      education: '',
      compony: '',
      experience: '',
      package: '',
      id: '1',
    });
    
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee detail updated!');
            this._dialogRef.close(true);
            
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee Added Successfully');
            this._dialogRef.close(true);
            
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
