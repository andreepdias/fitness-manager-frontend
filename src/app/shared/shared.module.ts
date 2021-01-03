import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { IMaskModule } from 'angular-imask';
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';


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
    ToastModule,
    IMaskModule
    
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
    ToastModule,
    IMaskModule
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
