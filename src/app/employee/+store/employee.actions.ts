import { createAction, props } from '@ngrx/store';
import { EmplyeeModel } from 'src/app/shared/models/task.model';

//invoke API call
export const invokeEmployeesAPI = createAction(
  '[Employees API] Employees Books Fetch API'
);

export const EmployeesFetchAPISuccess = createAction(
  '[Employee API] Fetch API Success',
  props<{ allEmployees: EmplyeeModel[] }>()
);

export const EmployeesFailure = createAction(
  '[Employee] Employees Failure',
  props<{ error: any }>()
);

//add the employee

export const invokeSaveNewEmployeeAPI = createAction(
  '[Employee API] Inovke save new employee api',
  props<{ newEmployee: EmplyeeModel }>()
);
 
export const saveNewEmployeeAPISucess = createAction(
  '[Employee API] save new employee api success',
  props<{ newEmployee: EmplyeeModel }>()
);
