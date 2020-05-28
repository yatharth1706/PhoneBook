import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  contacts: any[] = [];

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.taskService.getContacts().subscribe((response: any) => {
      this.contacts = response;
    })
  }
  
  toggle(id){
    console.log("clicked");
    if(document.getElementById(id).style.display === "block"){
      document.getElementById(id).style.display = "none";
    }else{
      document.getElementById(id).style.display = "block";
    }
  }

  deleteTask(id){
    this.taskService.deleteTask(id).subscribe((response) => {
      alert("Successfully Deleted!! Redirecting to front page")
      window.location.reload();
    })
  }
}
