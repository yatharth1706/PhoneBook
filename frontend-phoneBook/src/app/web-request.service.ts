import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = "http://localhost:3000/api";
  }

  get(url: string) {  
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/${url}`,payload);
  }

  patch(url: string, payload: object){
    return this.http.patch(`${this.ROOT_URL}/${url}`,payload);
  }

  delete(url: string){
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

}
