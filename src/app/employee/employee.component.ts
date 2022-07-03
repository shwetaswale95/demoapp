import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../services/user/employee.service';
import { EmplyeeModel, MODAL_TYPE } from '../shared/models/task.model';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


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

  constructor(public createDialog: MatDialog, private employeeData: EmployeeService) { }

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
    this.employeeData.getEmployee().pipe(takeUntil(this.destroyer$))
    .subscribe({
      next:(resultList) => {
        this.dataSource = new MatTableDataSource(resultList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error:(error) =>{
        alert(error)
      }
    });
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
