import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string = '';
  @Input('page-subtitle') pageSubtitle: string = '';

  @Input('show-button') showButton: boolean = true;
  @Input('button-text') buttonText: string = 'Back';
  @Input('button-class') buttonClass: string = 'p-button-rounded p-button-info';
  @Input('button-icon') buttonIcon: string = 'pi pi-angle-left';
  @Input('button-link') buttonLink: string = '/';

  constructor() { }

  ngOnInit(): void {
  }

}
