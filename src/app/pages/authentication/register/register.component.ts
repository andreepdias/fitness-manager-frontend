import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(){
    this.registerFormUser();
  }

  registerFormUser(){
    const user = new User(this.form.value.name, this.form.value.email, this.form.value.password);

    this.service.register(user).subscribe(
      success => this.successfulRegistration(success),
      error => this.failedRegistration(error)
    );
  }

  successfulRegistration(success: any){
    this.successMessage = 'Registration done successfully';
    this.errorMessages = [];

    this.form.reset();
  }

  failedRegistration(error: any){
    this.successMessage = '';
    this.errorMessages = error.error.errors;
  }

}
