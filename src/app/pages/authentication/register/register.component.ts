import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  successMessage: string = '';
  errorMessages: string[] = [];

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: [ '', Validators.required ],
      email: [ '', Validators.required ],
      password: [ '', Validators.required ],
      populateData: [ false ],
    });
  }

  submitForm(){
    this.registerFormUser();
  }

  registerFormUser(){
    const user = new User(this.form.value.name, this.form.value.email, this.form.value.password);

    if(this.form.value.populateData){
      this.service.registerWithData(user).subscribe(
        success => this.successfulRegistration(success),
        error => this.failedRegistration(error)
      );
    }else{
      this.service.register(user).subscribe(
        success => this.successfulRegistration(success),
        error => this.failedRegistration(error)
      );
    }

  }

  successfulRegistration(success: any){
    this.errorMessages = [];

    const user = new User(this.form.value.name, this.form.value.email, this.form.value.password);
    this.form.reset();
    
    this.service.login(user.email, user.password).subscribe(
      success => this.successfulLogin(success),
      error => this.failedLogin(error)
    );
  }

  failedRegistration(error: any){
    this.successMessage = '';

    if(error.error.errors){
      this.errorMessages = error.error.errors;
    }else{
      this.errorMessages = ['Registration failed. Server might be down right now. Try again later.'];
    }
  }

  successfulLogin(success: any){
    const accessToken = JSON.stringify(success);
    localStorage.setItem('access_token', accessToken);
    this.router.navigate(['']);
  }

  failedLogin(error: any){
    console.log('Failure logging in: ', error);

    if(error.error.error_description){
      this.errorMessages = [error.error.error_description];
    }else{
      this.errorMessages = ['Login attempt failed. Server might be down right now. Try again later.'];
    }
  }

}
