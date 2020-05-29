import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest : WebRequestService) { }

  createContact(contactObject){
    // We want to send web request to create a list
    return this.webRequest.post('contacts', contactObject)
  }

  getContacts(){
    return this.webRequest.get('contacts');
  }
  
  getSpecificContact(id){
    return this.webRequest.get('contacts/'+id)
  }

  saveDetails(id, ob: any){
    return this.webRequest.patch('contacts/' + id, ob);
  }

  deleteTask(id){
    return this.webRequest.delete('contacts/' + id);
  }

  findContact(contactName){
    return this.webRequest.get('find/contacts/' + contactName);
  }
}
