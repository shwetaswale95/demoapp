import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmplyeeModel } from 'src/app/shared/models/task.model';
import * as fromEmployee from './employee.reducer';

// export const selectEmployeeState = createFeatureSelector<fromEmployee.State>(
//   fromEmployee.employeeFeatureKey
// );

//fetch all the data from our feature module
export const selectEmployeeState = createFeatureSelector<EmplyeeModel[]>(
  fromEmployee.employeeFeatureKey
);