import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    console.log(loginData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers if required
    });
    
    this.http.post<any>('http://localhost:8080/api/users/login', loginData, { headers: headers })
      .subscribe(
        response => {
          const token = response.token; // Assuming the API returns a JSON object with a 'token' field
          // You can store the token in local storage or session storage for future use
          localStorage.setItem('token', token);
          console.log("response ", response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log('Login failed:', error);
          Swal.fire('Error!', 'Something went wrong', 'error');
        }
      );
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
