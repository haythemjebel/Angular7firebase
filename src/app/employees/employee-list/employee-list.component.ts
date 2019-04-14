import { ToastrService } from 'ngx-toastr';
import { Employee } from './../../shared/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  List : Employee[];
  constructor(private service :EmployeeService, private fire : AngularFirestore,private tost:ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray=>{
      this.List= actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...item.payload.doc.data()}as Employee;
      })
    });
  }
  onEdit(emp:Employee){
    this.service.formData=Object.assign({},emp);
  }
  onDelete(id:string){
    if(confirm("are you sure to delete this record ?"))
    this.fire.doc('employees/'+id).delete();
    this.tost.warning('deleted successfully','EMP. Register')
  }

}
