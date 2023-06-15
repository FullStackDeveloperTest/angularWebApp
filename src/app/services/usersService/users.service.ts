import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';
const endpoint = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient, private authService: AuthService) { }
  getAllUsers(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    });
    return this.http.get(endpoint, { headers: headers});
  }
}
