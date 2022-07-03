import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmplyeeModel } from 'src/app/shared/models/task.model';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(data: any) {
    return this.http.post<EmplyeeModel>(`${environment.baseUrl}/employeeList/`, data);
  }

  getEmployee() {
    return this.http.get<EmplyeeModel[]>(`${environment.baseUrl}/employeeList/`);
  }

  updateEployee(id: number, data: EmplyeeModel) {
    return this.http.put<EmplyeeModel>(`${environment.baseUrl}/employeeList/${id}`, data);
  }

  removeEmployee(id: number) {
    return this.http.delete<EmplyeeModel>(`${environment.baseUrl}/employeeList/${id}`);
  }
}
