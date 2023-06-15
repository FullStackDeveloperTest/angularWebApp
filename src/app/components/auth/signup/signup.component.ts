import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.removeToken();
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      age: new FormControl('', Validators.pattern('^[0-9]*$'))
    });
  }

  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  address!: string;
  phoneNumber!: string;
  age!: number;
  imageURL!: string;
  
  signup() {

    if(this.signupForm?.valid){
  
      try {
        const signupData = {
          name: this.signupForm.value.name,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
          address: this.signupForm.value.address,
          phoneNumber: this.signupForm.value.phoneNumber,
          image: this.imageURL,
          age: this.signupForm.value.age
        };

        if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
          Swal.fire('Error!', 'Passwords do not match', 'error');
          return;
        }
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          // Add any additional headers if required
        });
        
        this.http.post<any>('http://localhost:8080/api/users/signup', signupData, {headers: headers}).subscribe(
          response => {
            
            this.router.navigate(['/']);
          },
          error => {
            Swal.fire('Error!', 'SignUp unsuccessful', 'error');
            // Handle error cases
          }
        );
      } catch (error) {
        console.log('Error fetching random image:', error);
      }
    } else {
      Swal.fire('Error!', 'There´s a mistake in the form you just submitted.', 'error');
    }
  }
}
