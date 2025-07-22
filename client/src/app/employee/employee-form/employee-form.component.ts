import { Component } from '@angular/core';
import { Employe } from 'src/app/shared/employe.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  submiteed: boolean = false;
  constructor(public service:EmployeeService) {}

  onSubmit() {
    this.submiteed = true;
    if (this.service.employeeForm.valid) {
      console.log(this.service.employeeForm.value);
      if (this.service.employeeForm.get("_id")?.value == "") {
          this.service.postEmployee().subscribe(res => {
          this.resetForm();
          this.service.fetchEmployeeList();
          console.log("got the response")
        });
      } else {
        this.service.putEmployee().subscribe(res => {
          this.resetForm();
          this.service.fetchEmployeeList();
          console.log("Updated employee.");
        });
      }
    } else {
      console.log("not valid")
    }
  }

  resetForm() {
    this.service.employeeForm.reset(new Employe);
    this.submiteed = false;
  }

}
