import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  submitted = false;
  constructor(private userService:UserService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // Add this onSubmit method
  handleRegister() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const {firstName,lastName,email, password}= this.registerForm.value;

        this.userService.registerApi ({
          first_name:firstName,
          last_name:lastName,
          email : email,
          password : password
        }).subscribe( results =>{console.log(results)},error=>{console.log(error)});
    // Here, you will handle your form submission.
    // For now, let's just log to the console.
    console.log('Registered Successfully',this.registerForm.value);
    this.handleSignIn();
  }

  handleSignIn(){
    this.router.navigate(['']);
  }

}
