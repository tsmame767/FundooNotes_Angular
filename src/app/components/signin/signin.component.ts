import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  handleLogin() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.userService.loginApi({
      email: email,
      password: password
    }).subscribe(
      (results: any) => {
        if (results && results.token) {
          // Store the token
          localStorage.setItem('userToken', results.token);
          console.log('Token:', results.token);

          // Navigate to another route if login is successful
          this.router.navigate(['/dashboard']); // Make sure to replace '/dashboard' with your desired route
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
      }
    );
  }

  handleCreateAccount() {
    this.router.navigate(['/signup']);
  }

  handlePassword(): void {
    // Your password handling logic here
  }

}
