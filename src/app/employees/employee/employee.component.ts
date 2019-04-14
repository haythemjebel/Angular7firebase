import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service : EmployeeService , private fire:AngularFirestore,  private  tostor : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData ={
      id :null,
      fullname:'',
      position:'',
      empcode:'',
      mobile:''
    }
  }
  onSubmit(form: NgForm){
    let data =Object.assign({},form.value) ;
    delete data.id ;
    if(form.value.id==null)
    this.fire.collection('employees').add(data);
    else
    this.fire.doc('employees/'+form.value.id).update(data);
    this.resetForm(form);
    this.tostor.success('Submitted successfully','EMP . Register')
  }
}
