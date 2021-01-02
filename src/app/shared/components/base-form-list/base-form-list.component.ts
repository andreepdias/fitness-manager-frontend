import { Component, Directive, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../model/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

@Directive()
export abstract class BaseFormListComponent<T extends BaseResourceModel> implements OnInit {

  currentAction: string = '';
  serverErrorMessages: string[] = [];

  form: FormGroup = new FormGroup({});

  formBuilder: FormBuilder;
  messageService: MessageService;
  router: Router;
  route: ActivatedRoute;

  constructor(
    protected injector: Injector,
    protected service: BaseResourceService<T>,
    protected jsonToResourceFn: (json: any) => T
  ) {
    this.formBuilder = injector.get(FormBuilder);
    this.messageService = injector.get(MessageService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
  }

  setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new'){
      this.currentAction = 'new';
    }else{
      this.currentAction = 'edit';
    }
  }

  onSubmitForm(){
    if(this.currentAction == 'new'){
      this.createResource();
    }else{
      this.updateResource();
    }
  }

  loadResource(){
    if(this.currentAction == 'edit'){
      this.route.params.pipe(
        switchMap(params => this.service.getById(+params['id']))
      ).subscribe(
        success => this.actionsForSuccessLoad(),
        error => this.actionsForFailedLoad()
      );
      // service by id
    }
  }

  createResource(){
    const resource = this.jsonToResourceFn(this.form.value);
    this.service.create(resource).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForFailure(error)
      );
    }
    
  updateResource(){
    const resource = this.jsonToResourceFn(this.form.value);
    this.service.update(resource).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForFailure(error)
    );
      
  }
  
  actionsForSuccess(success: any){
    // toast success
    // return list
  }

  actionsForFailure(error: any){
    this.serverErrorMessages = error.error.errors;
  }


  protected buildForm: void;
}
