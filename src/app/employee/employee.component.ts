import { selectEmployeeState } from './+store/employee.selectors';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../services/user/employee.service';
import { EmplyeeModel, MODAL_TYPE } from '../shared/models/task.model';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesFailure, invokeEmployeesAPI } from './+store/employee.actions';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  displayedColumns = ['firstname', 'lastname', 'email', 'telephone', 'address', 'action'];
  dataSource!: MatTableDataSource<EmplyeeModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchTerm : string | undefined;
  private readonly destroyer$: Subject<void> = new Subject();
  //observalble listen changes from store
  employee$ = this.store.pipe(select(selectEmployeeState));
  errorMessage$: any;

  constructor(public createDialog: MatDialog, private employeeData: EmployeeService,
    private store: Store) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public addEmployee(): void {
    const dialogRef = this.createDialog.open(AddEmployeeComponent, {
      width: '50vw',
      data: {
        data: null,
        typeForm: MODAL_TYPE.CREATE
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroyer$)).subscribe(result => {
      if (result) {
        console.log(result);
        this.getEmpList();
      }
    });
  }

  private getEmpList(): void {
    //with redux
    this.store.dispatch(invokeEmployeesAPI());
    this.employee$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    //with normal flow
    // this.employeeData.getEmployee().pipe(takeUntil(this.destroyer$))
    // .subscribe({
    //   next:(resultList) => {
    //     this.dataSource = new MatTableDataSource(resultList);
    //     console.log(this.dataSource)
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   }, error:(error) =>{
    //     alert(error)
    //   }
    // });
  }

  public editEmployee(item: EmplyeeModel) {
    const dialogRef = this.createDialog.open(AddEmployeeComponent, {
      width: '50vw',
      data: {
        data: item,
        typeForm: MODAL_TYPE.EDIT
      }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.destroyer$)).subscribe(result => {
      if (result) {
        this.getEmpList();
      }
    });
  }

  public removeEmployee(id:number): void {
    this.employeeData.removeEmployee(id).pipe(takeUntil(this.destroyer$)).subscribe(()=>{
      this.getEmpList();
    }, error =>{
      alert(error)
    })
  }

}
