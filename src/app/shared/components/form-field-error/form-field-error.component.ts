import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: AbstractControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage()){
      return this.getErrorMessage();
    }else{
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  private getErrorMessage(): string | null {    
    if(this.formControl.errors){
      if(this.formControl.errors.required){
        return "Required field.";
      }
      else if(this.formControl.errors.email){
        return "Invalid email.";
      }
      else if(this.formControl.errors.minlength){
        const requiredLength = this.formControl.errors.minlength.requiredLength;
        return `Minimum ${requiredLength} characters.`;
      }
      else if(this.formControl.errors.maxlength){
        const requiredLength = this.formControl.errors.maxlength.requiredLength;
        return `Maximum ${requiredLength} characters.`;
      }
    }
    return null;
  }

}
