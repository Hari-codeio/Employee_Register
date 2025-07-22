import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employe } from './employe.model';
import { environment } from '../.././environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb:FormBuilder, private http: HttpClient) {}

  readonly baseUrl = environment.BASE_URL;

  list: Employe[] = [];

  employeeForm = this.fb.group({
    _id: [""],
    name: ["", Validators.required],
    description: ["", Validators.required],
  })
  
  fetchEmployeeList() {
    return this.http.get(this.baseUrl)
    .pipe(catchError(this.errorHandler))
    .subscribe(data => {
      this.list = data as Employe[];
      console.log(data)
    })
  }

  postEmployee() {
    const { _id, ...formData } = this.employeeForm.value;
    return this.http.post(this.baseUrl, formData)
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.baseUrl}${_id}`)
    .pipe(catchError(this.errorHandler))
  }

  putEmployee() {
    return this.http.put(this.baseUrl+this.employeeForm.get("_id")?.value, this.employeeForm.value)
    .pipe(catchError(this.errorHandler))
  }
  
  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log("An error occured:",  error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error("something jbad happened : please try again later"));
  }
}
