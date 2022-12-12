import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { StoreModule } from '@ngrx/store';
import * as fromEmployee from './+store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './+store/employee.effects';


@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    EmployeeRoutingModule,
    StoreModule.forFeature(fromEmployee.employeeFeatureKey, fromEmployee.employeereducer),
    EffectsModule.forFeature([EmployeeEffects])
  ]
})
export class EmployeeModule { }
