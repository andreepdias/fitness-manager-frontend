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


@NgModule({
  declarations: [PageHeaderComponent],
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
    MultiSelectModule
    
  ],
  exports: [
    PageHeaderComponent,
    
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    PaginatorModule,
    ButtonModule,
    IMaskModule,
    ToastrModule,
    MultiSelectModule
  ],
  providers: [
    ToastrService
  ]
})
export class SharedModule { }
