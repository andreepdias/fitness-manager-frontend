import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { IMaskModule } from 'angular-imask';
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { MultiSelectModule } from 'primeng/multiselect';


import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';



@NgModule({
  declarations: [PageHeaderComponent, FormFieldErrorComponent, ServerErrorMessagesComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    PaginatorModule,
    ButtonModule,
    IMaskModule,
    ToastrModule.forRoot(),
    MultiSelectModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule
    
  ],
  exports: [
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    PaginatorModule,
    ButtonModule,
    IMaskModule,
    ToastrModule,
    MultiSelectModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule
  ],
  providers: [
    ToastrService
  ]
})
export class SharedModule { }
