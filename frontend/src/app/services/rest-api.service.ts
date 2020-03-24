import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  public environment: any;
  

  constructor(
    private http: HttpClient
  ) { this.environment = environment}

  getData() {
   return this.http.get(this.environment.resturl + '/ToDoLists');
  }

  insertData(data) {
    return this.http.post(this.environment.resturl + '/ToDoLists', data);
  }

  updateStatus(id, status) {
    return this.http.patch(this.environment.resturl + 'ToDoLists/' + id, {"completed": status});
  }

  deleteRecord(id) {
    return this.http.delete(this.environment.resturl + 'ToDoLists/' + id);
  }

  getRecordDetails(id) {
    return this.http.get(this.environment.resturl + '/ToDoLists' + '?filter[where][id]=' + id);
  }

  updateFormData(id, title, description) {
    return this.http.patch(this.environment.resturl + 'ToDoLists/' + id, {"title": title, "description": description});
  }
}
