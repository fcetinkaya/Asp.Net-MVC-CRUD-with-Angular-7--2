import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../model/employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  url = "http://localhost:8991/Api/Employee";

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/AllEmployeeDetails');
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/GetEmployeeDetailsById/' + employeeId);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Employee>(this.url + '/InsertEmployeeDetails/', employee, httpOptions);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(this.url + '/UpdateEmployeeDetails/', employee, httpOptions);
  }

  deleteEmployee(employeeid: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteEmployeeDetails?id=' + employeeid, httpOptions);
  }

}
