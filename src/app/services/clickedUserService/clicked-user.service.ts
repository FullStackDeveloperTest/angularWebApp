import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';
const endpoint = 'http://localhost:8080/api/users/';
@Injectable({
  providedIn: 'root'
})
export class ClickedUserService {

  constructor( private http:HttpClient, private authService: AuthService) { }
  getUser(id: number | undefined): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    });
    return this.http.get(endpoint+id, {headers: headers});
  }
}
