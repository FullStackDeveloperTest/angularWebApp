import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/authService/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.removeToken();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  login(): void {
    if(this.loginForm?.valid){
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

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
            this.router.navigate(['/users']);
          },
          error => {
            Swal.fire('Error!', 'Login unsuccessful', 'error');
          }
        );
    } else {
      Swal.fire('Error!', 'There´s a mistake in the form you just submitted.', 'error');
    }
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
