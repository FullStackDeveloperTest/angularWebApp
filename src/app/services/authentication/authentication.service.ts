import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private authService: AuthService) { }
  isLoggedIn(): boolean {
    let token = this.authService.getToken();
    return token !== null;
  }
}
