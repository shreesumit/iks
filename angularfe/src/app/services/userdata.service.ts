import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  constructor(private http: HttpClient) {}
  users() {
    return this.http.get('http://localhost:4000/getUsersData');
  }
}
