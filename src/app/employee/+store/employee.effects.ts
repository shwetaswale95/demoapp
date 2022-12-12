import { EmployeeService } from 'src/app/services/user/employee.service';
import { selectEmployeeState } from './employee.selectors';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as EmployeeActions from './employee.actions';
import { select, Store } from '@ngrx/store';


@Injectable()
export class EmployeeEffects {

  constructor(private actions$: Actions, private store: Store,
    private employeeService: EmployeeService) {}


    loadAllEmployee$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(EmployeeActions.invokeEmployeesAPI),
        switchMap(() =>
        this.employeeService.getEmployee().pipe(
          map(data => EmployeeActions.EmployeesFetchAPISuccess({allEmployees: data})),
          catchError(
            error => of(EmployeeActions.EmployeesFailure({error}))
          )
      ))
      );
    });


  saveNewEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeActions.invokeSaveNewEmployeeAPI),
      switchMap((action) => {
        return this.employeeService.addEmployee(action.newEmployee).pipe(
          map((data) => {
            return EmployeeActions.saveNewEmployeeAPISucess({ newEmployee: data });
          })
        );
      })
    );
  });  
}
