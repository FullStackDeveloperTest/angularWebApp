import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  address!: string;
  phoneNumber!: string;
  age!: number;
  imageURL!: string;

  constructor(private http: HttpClient, private router: Router) {}
  
  signup() {
    if (this.password !== this.confirmPassword) {
      Swal.fire('Error!', 'Passwords do not match', 'error');
      return;
    }
  
    try {
      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        phoneNumber: this.phoneNumber,
        image: this.imageURL,
        age: this.age
      };
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // Add any additional headers if required
      });
      
      console.log(signupData);
      this.http.post<any>('http://localhost:8080/api/users/signup', signupData, {headers: headers}).subscribe(
        response => {
          console.log("Signup successful:", response);
          
          this.router.navigate(['/']);
        },
        error => {
          console.log('Signup failed:', error);
          Swal.fire('Error!', 'Something went wrong', 'error');
          // Handle error cases
        }
      );
    } catch (error) {
      console.log('Error fetching random image:', error);
    }
  }
}
