import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})

export class CreateContactComponent implements OnInit {
  mobileNumbers: any[] = [];
  emails : any[] = [];
  contactOject: any;
  
  message: string= "";
  userError: any;
  myForm: FormGroup;

  dateValidator(c: AbstractControl): { [key: string]: boolean } {
    let value = c.value;
    if (value && typeof value === "string") {
      let match = value.match(/^(([1-9]|0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2]|[1-9])\/([12]\d{3}))/);
      if (!match) {
        return { 'dateInvalid': true };
      } else if (match && match[0] !== value) {
        return { 'dateInvalid': true };
      }
    }
    return null;
  }

  constructor(public fb: FormBuilder,private taskService : TaskService, private router: Router) {
    
    // form validation
    this.myForm = this.fb.group({
      name: ['',[Validators.required]],
      dob: ['' ,[Validators.required, this.dateValidator]],
      contactno: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      email: ['', [Validators.required, Validators.email]],
    })

   }


  ngOnInit(): void {
    
  }

  saveDetails(myform: FormGroup){
    let name = myform.value.name;
    let dob = myform.value.dob;
    let mobile = myform.value.contactno;
    let email = myform.value.email;
    
    if(myform.valid == false){
      return alert("Some fields of form are not valid or filled!!");
    }

    this.mobileNumbers.push(mobile);
    this.emails.push(email);
    
    this.contactOject = {
      "name": name,
      "dob": dob,
      "phoneNumbers": this.mobileNumbers,
      "emails": this.emails
    }

    this.taskService.createContact(this.contactOject).subscribe((data) => {
      console.log(data);
      alert("Saved successfully");
      this.router.navigate(['']);
    });

  }

  

}
