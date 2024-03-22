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
      firstName: ['',[Validators.required , Validators.name]] ,
      lastName: ['',[Validators.required , Validators.name]],
      email: ['',[Validators.required , Validators.email]],
      dob: ['',[Validators.required , Validators.dob]],
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





















// my old file 

// import { Component, Inject, inject } from '@angular/core';
// import { FormBuilder, FormGroup ,FormControlName} from '@angular/forms';
// import { EmployeeService } from '../services/employee.service';
// import { DialogRef } from '@angular/cdk/dialog';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CoreService } from '../core/core.service';

// @Component({
//   selector: 'app-emp-add-edit',
//   templateUrl: './emp-add-edit.component.html',
//   styleUrls: ['./emp-add-edit.component.css'],
// })
// export class EmpAddEditComponent {
//   empForm: FormGroup;

//   education: string[] = [
//     'Matric',
//     'Diploma',
//     'intermediate',
//     'Graduate',
//     'PostGraduate',
//   ];

//   constructor(
//     private _fb: FormBuilder,
//     private _empService: EmployeeService,
//     public _dialogRef: DialogRef<EmpAddEditComponent>,
//     @Inject (MAT_DIALOG_DATA) public data :any,
//     private _coreService : CoreService,
//     private For : FormControlName
//   ) {
//     this.empForm = this._fb.group({
//       firstName: '',
//       lastName: '',
//       email: '',
//       dob: '',
//       gender: '',
//       education: '',
//       compony: '',
//       experience: '',
//       package: '',
//       id: '1',
//     });
//   }
//   onFormSubmit() {
//     if (this.empForm.valid) {
//       if(this.data){
//         this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
//           next: (val: any) => {
//             alert(' ');
//             this._coreService.openSnackBar('Employee detail updated!');
//             this._dialogRef.close();
//           },
//           error: (err: any) => {
//             console.error(err);
//           },
//         });

//       }else{
//         this._empService.addEmployee(this.empForm.value).subscribe({
//           next: (val: any) => {
//             this._coreService.openSnackBar('Employee Added Successfully');
//             this._dialogRef.close();
//           },
//           error: (err: any) => {
//             console.error(err);
//           },
//         });

//       }
      
//     }
//   }
// }
