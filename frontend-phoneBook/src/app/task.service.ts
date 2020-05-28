import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequest : WebRequestService) { }

  createList(contactObject){
    // We want to send web request to create a list
    return this.webRequest.post('contacts', contactObject)
  }
  
}
