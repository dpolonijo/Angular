import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestApiService implements OnInit {

  public environment: any;
  

  constructor(
    private http: HttpClient
  ) { this.environment = environment}

  ngOnInit() {
  }


  getData() {
   return this.http.get(this.environment.resturl + '/ToDoLists');
  }

  insertData(data) {
    return this.http.post(this.environment.resturl + '/ToDoLists', data);
  }

  

}
