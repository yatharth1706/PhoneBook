import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute , Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  parameters: any;
  personDetails: any[] = [];
  phoneNumbers: any[] = [];
  emails : any[] = [];
  constructor(private taskService : TaskService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.parameters = params;
    })
    this.getContacts(this.parameters.contactId);
  }

  getContacts(id){
    this.taskService.getSpecificContact(id).subscribe((response: any) => {
      this.personDetails = response[0];
      console.log(this.personDetails);
    })
  }

  saveDetails(name,dob,phone,email){
    this.phoneNumbers.push(phone.value);
    this.emails.push(email.value);

    this.taskService.saveDetails(this.parameters.contactId,{
      "name": name.value,
      "dob": dob.value,
      "phone": this.phoneNumbers,
      "emails": this.emails
    }).subscribe((response) => {
      alert("Successfully updated!!");
      this.router.navigate(['']);
    });
  }
}
