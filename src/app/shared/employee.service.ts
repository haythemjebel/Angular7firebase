import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData :Employee;
  
  constructor(private fire:AngularFirestore) { }

  getEmployees(){
    return this.fire.collection('employees').snapshotChanges()
  }
}
