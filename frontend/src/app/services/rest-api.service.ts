import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestApiService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    
  }


  getData() {
    return this.http.get('http://localhost:3000/api/ToDoLists');
  }

  

}
