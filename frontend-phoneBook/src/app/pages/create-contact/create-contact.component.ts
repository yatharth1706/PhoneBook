import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  mobileNumbers: any[] = [];
  emails : any[] = [];
  contactOject: any;
  constructor(private taskService : TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  saveDetails(name,dob,mobile,email){
    if(name.value == ''){
      return alert("Enter name !!");
    }
    if(dob.value == ''){
      return alert("Enter dob !!");
    }
    if(mobile.value == ''){
      return alert("Enter mobile !!");
    }
    if(email.value == ''){
      return alert("Enter email !!");
    }

    this.mobileNumbers.push(mobile.value);
    this.emails.push(email.value);
    
    this.contactOject = {
      "name": name.value,
      "dob": dob.value,
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
