import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES_DIET: RouteInfo[] = [
  { path: '/meals', title: 'Daily Meals',  icon: 'ni ni-satisfied text-blue', class: '' },
  { path: '/foods', title: 'Foods',  icon: 'pi pi-apple text-red', class: '' },
  { path: '/recipes', title: 'Recipes',  icon:'ni ni-book-bookmark text-yellow', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItemsTraining: any[] = [];
  menuItemsDiet: any[] = [];

  isCollapsed = true;

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
    this.menuItemsDiet = ROUTES_DIET;
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
