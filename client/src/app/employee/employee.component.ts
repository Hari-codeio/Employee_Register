import { Component } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employe } from '../shared/employe.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  constructor(public service: EmployeeService) {}

  ngOnInit(): void {
    this.service.fetchEmployeeList();
  }

  populateForm(selectedRecord: Employe) {
    this.service.employeeForm.setValue({
      _id : selectedRecord._id ?? null,
      name : selectedRecord.name,
      description : selectedRecord.description,
    })
  }
  
  onDelete(id?: string) {
    if (!id) return;
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.fetchEmployeeList();
      })
    }
  }
}
