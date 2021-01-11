import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DailyMeal } from './daily-meal.model';
import { MealEntry } from './meal-entry.model';

@Injectable({
  providedIn: 'root'
})
export class MealService extends BaseResourceService<DailyMeal>{

  constructor(
    protected injector: Injector
  ){
    super(injector, "meals", DailyMeal.fromJSON);
  }

  getByDate(day: number, month: number, year: number){

    const params = new HttpParams()
                    .set('day', String(day))
                    .set('month', String(month))
                    .set('year', String(year));

    return this.http.get(this.apiURL, { params }).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  createEntry(entry: MealEntry){
    return this.http.post(`${this.apiURL}/entries`, entry).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  updateEntry(entry: MealEntry){
    console.log('service update: ', entry);
    return this.http.post(`${this.apiURL}/entries/${entry.id}`, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  deleteEntry(entry: MealEntry){
    return this.http.delete(`${this.apiURL}/entries/${entry.id}`).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  createDailyMeal(day: number, month: number, year: number){
    const params = new HttpParams()
                    .set('day', String(day))
                    .set('month', String(month))
                    .set('year', String(year));

    return this.http.post(this.apiURL, null, { params }).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    )
  }
}
