import { Component, Directive, Injector, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  messageService: MessageService;

  constructor(
    protected injector: Injector,
    protected service: BaseResourceService<T>,    
  ) {
    this.messageService = injector.get(MessageService);
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
    this.resources = success;
  }

  loadPage(page: number, size: number){
    this.service.getPage(page, size).subscribe(
      success => this.actionsForSuccessLoadPage(success),
      error => this.actionsForFailure(error)
    );
  }

  actionsForSuccessLoadPage(success: any){
    console.log(success);
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
    this.messageService.add({severity: 'success', summary: 'Deletion succeed', detail: success.name + ' was successfully deleted.'});
    this.loadPage(this.paginatorConfig.currentPage, this.paginatorConfig.size);
  }
  
  actionsForFailedDelete(error: any){
    console.log(error.error.errors);
    error.error.errors.forEach((message: string) => {
      this.messageService.add({severity: 'error', summary: 'Deletion failed', detail: message});
    });
  }



}
