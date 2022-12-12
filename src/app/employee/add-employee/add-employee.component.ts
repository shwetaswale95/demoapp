import { select, Store } from '@ngrx/store';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/user/employee.service';
import { MODAL_TYPE } from 'src/app/shared/models/task.model';
import { invokeSaveNewEmployeeAPI } from '../+store/employee.actions';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  public typeForm!: MODAL_TYPE.CREATE | MODAL_TYPE.EDIT;
  addEmpForm!: FormGroup;
  private readonly destroyer$: Subject<void> = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public popupConfig: any,
  public dialogRef: MatDialogRef<AddEmployeeComponent>,
  private employeeData:EmployeeService, private store: Store) { }

  ngOnInit(): void {
    this.getPopupParams();
    this.setupForm();
    this.patchData();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  private getPopupParams(): void {
    this.typeForm = this.popupConfig.typeForm;
  }

  private setupForm(): void {
    this.addEmpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', Validators.required),
    });
  }

  private patchData(): void {
    if(this.typeForm === MODAL_TYPE.EDIT) {
      this.addEmpForm.patchValue(this.popupConfig.data);
    }
  }

  public getFC(controlName: string): AbstractControl {
    return this.addEmpForm.controls[controlName];
  }

  public saveEmployee(): void {
    if (this.typeForm === MODAL_TYPE.CREATE) {
      this.addEmployee();
    } else {
      this.editEmployee();
    }
  }

  private addEmployee(): void {
    this.store.dispatch(invokeSaveNewEmployeeAPI({ newEmployee: this.addEmpForm.value }));
    this.addEmpForm.reset();
    this.dialogRef.close('add');
    // this.employeeData.addEmployee(this.addEmpForm.value).pipe(takeUntil(this.destroyer$))
    // .subscribe({
    //   next:() =>{
    //     this.addEmpForm.reset();
    //     this.dialogRef.close('add');
    //   }, error:(error) =>{
    //     alert(error);
    //   }
    // });
  }

  private editEmployee() : void {
    this.employeeData.updateEployee(this.popupConfig.data.id,this.addEmpForm.value).pipe(takeUntil(this.destroyer$))
    .subscribe({
      next:() => {
        this.dialogRef.close('update');
      }, error:(error) =>{
        alert(error);
      }
    });
  }
}
