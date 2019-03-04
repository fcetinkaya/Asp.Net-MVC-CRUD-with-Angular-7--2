import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = null;
  message = null;

  constructor(private formbulider: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      EmpName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PinCode: ['', [Validators.required]]
    });
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  loadEmployeeToEdit(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.message = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmployeeID;
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      this.employeeForm.controls['Address'].setValue(employee.Address);
      this.employeeForm.controls['PinCode'].setValue(employee.PinCode);
    })
  }
  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.message = "Record saved Successfully";
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        });
    } else {
      employee.EmployeeID = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = "Record Updated Successfully";
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      })
    }
  }
  deleteEmployee(employeeId: null) {
    if (confirm("Are you sure want to delete this?")) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.message = "Record Deleted Successfully";
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      })
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
