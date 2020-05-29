import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute , Params, Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


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
  message: string= "";
  userError: any;
  myForm: FormGroup;
  // custom validator for date
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

  constructor(public fb: FormBuilder,private taskService : TaskService,private route: ActivatedRoute, private router: Router) {
    this.myForm = this.fb.group({
      name: ['',[Validators.required]],
      dob: ['' ,[Validators.required, this.dateValidator]],
      contactno: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      email: ['', [Validators.required, Validators.email]],
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.parameters = params;
    })
    this.getContacts(this.parameters.contactId);
    // this.taskService.saveDetails( "5ed0a31cb9c88c0fb45ab703" ,{
    //   "name": "bums",
    //   "phoneNumbers": ["8071289737"],
    //   "emails": ["accountant12@gmail.com"]
    // }).subscribe((res) => {
    //   console.log("updated!!");
    // })
  }

  getContacts(id){
    this.taskService.getSpecificContact(id).subscribe((response: any) => {
      this.personDetails = response[0];
      console.log(this.personDetails);
      console.log(this.myForm);
      this.myForm.controls.name.setValue(this.personDetails['name']);
      this.myForm.controls.dob.setValue(this.personDetails['dob']);
      this.myForm.controls.email.setValue(this.personDetails['emails']);
      this.myForm.controls.contactno.setValue(this.personDetails['phoneNumbers']);
    })
  }

  saveDetails(myform: FormGroup,name1,dob1,mobile1,email1){
    let name = name1.value;
    let dob = dob1.value;
    let mobile = mobile1.value;
    let email = email1.value;
    
    console.log(name,dob,mobile,email);    
    if(myform.valid == false){
      return alert("Some fields of form are not valid or filled!!");
      
    }

    this.phoneNumbers.push(mobile);
    this.emails.push(email);

    this.taskService.saveDetails(this.parameters.contactId,{
      "name":name,"dob":dob,"phoneNumbers":this.phoneNumbers,"emails":this.emails
    }).subscribe((response) => {
      alert("Successfully updated!!");
      this.router.navigate(['']);
    });
  }
}
