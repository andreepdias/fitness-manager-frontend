import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { UserMealInfo } from './user-meal-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserMealInfoService extends BaseResourceService<UserMealInfo>{

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'meals/meals-info', UserMealInfo.fromJSON);
  }

  loadActiveUserMealInfo(){
    return this.http.get(`${this.apiURL}`).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  updateWithDate(resource: UserMealInfo, date: Date){
    const params = new HttpParams().set('day', String(date.getDate())).set('month', String(date.getMonth()) + 1).set('year', String(date.getFullYear()));
    return this.http.post(`${this.apiURL}/${resource.id}/date`, resource, { params }).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }
}
