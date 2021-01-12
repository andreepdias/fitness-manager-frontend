import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FoodsModule } from '../pages/foods/foods.module';
import { RecipesModule } from '../pages/recipes/recipes.module';
import { MealsModule } from '../pages/meals/meals.module';
import { TagsModule } from '../pages/tags/tags.module';
import { ExercisesModule } from '../pages/exercises/exercises.module';
import { RoutinesModule } from '../pages/routines/routines.module';
import { HomeModule } from '../pages/home/home.module';



@NgModule({
  declarations: [LayoutComponent, SidebarComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    HttpClientModule,

    FoodsModule,
    RecipesModule,
    MealsModule,

    TagsModule,
    ExercisesModule,
    RoutinesModule,
    HomeModule
  ]
})
export class CoreModule { }
