import { HttpClient, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResourceModel } from "../model/base-resource.model";
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  http: HttpClient;

  apiURLBase: string = environment.apiURLBase;
  apiURL: string;

  constructor(
    protected injector: Injector,
    protected urlPath: string,
    protected jsonToResourceFn: (json: any) => T
  ){
    this.http = injector.get(HttpClient);
    this.apiURL = this.apiURLBase + '/' + urlPath;
  }

  /* REST CALLS */

  getAll(){
    return this.http.get(this.apiURL + '/all').pipe(
      catchError(this.handleError),
      map(this.jsonToResources.bind(this))
    );
  }

  getPage(page: number = 0, size: number = 0){
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get(this.apiURL, { params }).pipe(
      catchError(this.handleError),
      map(this.jsonToResourcesPage.bind(this))
    );
  }

  getById(id: number){
    return this.http.get(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    )
  }

  create(resource: T){
    console.log(resource);
    return this.http.post(this.apiURL, resource).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    )
  }

  update(resource: T){
    return this.http.post(`${this.apiURL}/${resource.id}`, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(resource: T){
    return this.http.delete(`${this.apiURL}/${resource.id}`).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }


  /* PRIVATE METHODS */

  jsonToResource(json: any){
    return this.jsonToResourceFn(json);
  }

  jsonToResources(jsonArray: any){
    const resources: T[] = [];
    jsonArray.forEach(
      (element: T) => resources.push(element)
    );
    return resources;
  }

  jsonToResourcesPage(jsonPage: any){
    const resources: T[] = [];
    jsonPage.content.forEach(
      (element: T) => resources.push(element)
    );
    jsonPage.content = resources;
    return jsonPage;
  }

  handleError(error: any){
    return throwError(error);
  }




}
