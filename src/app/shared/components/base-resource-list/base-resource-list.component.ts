import { Component, Directive, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceModel } from '../../model/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  paginatorConfig = {
    size: 10,
    totalRecords: 10,
    pageLinkSize: 3,
    currentPage: 0
  }

  toastr: ToastrService;

  constructor(
    protected injector: Injector,
    protected service: BaseResourceService<T>,    
  ) {
    this.toastr = injector.get(ToastrService);
  }

  ngOnInit(): void {
    this.loadPage(0, this.paginatorConfig.size);
  }

  loadAll(){
    this.service.getAll().subscribe(
      success => this.actionsForSuccessLoadAll(success),
      error => this.actionsForFailure(error)
    );
  }

  actionsForSuccessLoadAll(success: any){
    console.log(success);
    this.resources = success;
  }

  loadPage(page: number, size: number){
    this.service.getPage(page, size).subscribe(
      success => this.actionsForSuccessLoadPage(success),
      error => this.actionsForFailure(error)
    );
  }

  actionsForSuccessLoadPage(success: any){
    this.resources = success.content;
    this.paginatorConfig.totalRecords = success.totalElements;
  }

  actionsForFailure(error: any){
    console.log('Error loading all resources: ', error);
  }

  paginate(event: any){
    this.paginatorConfig.currentPage = event.page;
    this.loadPage(event.page, event.rows);
  }

  deleteResource(resource: T){
    this.service.delete(resource).subscribe(
      success => this.actionsForSuccessDelete(success),
      error => this.actionsForFailedDelete(error)
    );
  }

  actionsForSuccessDelete(success: any){
    this.toastr.success(success.name + ' was successfully deleted.', 'Deletion succeed');
    this.loadPage(this.paginatorConfig.currentPage, this.paginatorConfig.size);
  }
  
  actionsForFailedDelete(error: any){
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, 'Deletion failed');
    });
  }



}
