import { EmplyeeModel } from 'src/app/shared/models/task.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';

export const employeeFeatureKey = 'employee';

export interface State {

}

// export const initialState: State = {

// };
//empty array assigned as initial data to store
export const initialState: ReadonlyArray<EmplyeeModel> = [];

export const employeereducer = createReducer(
  initialState,

  on(EmployeeActions.EmployeesFetchAPISuccess, (state, { allEmployees }) => {
    return allEmployees;
  }),
  
  on(EmployeeActions.EmployeesFailure, (state, action) => {
    return {...state, error: action.error};
  }),

  on(EmployeeActions.saveNewEmployeeAPISucess, (state, { newEmployee }) => {
    let newState = [...state];
    newState.unshift(newEmployee);
    return newState;
  })
  // on(EmployeeActions.yEmployees, state => state),
  // on(EmployeeActions.yEmployeesSuccess, (state, action) => state),
  // on(EmployeeActions.yEmployeesFailure, (state, action) => state),

);
