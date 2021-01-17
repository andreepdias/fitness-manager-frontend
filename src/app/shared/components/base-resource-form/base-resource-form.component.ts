import { AfterContentChecked, Component, Directive, Injector, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../model/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  pageTitle: string = '';
  currentAction: string = '';
  serverErrorMessages: string[] = [];

  form: FormGroup = new FormGroup({});
  
  imaskConfig: any = {
    mask: Number,
    scale: 3,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  formBuilder: FormBuilder;
  toastr: ToastrService;
  router: Router;
  route: ActivatedRoute;
  ngZone: NgZone;

  constructor(
    protected injector: Injector,
    protected service: BaseResourceService<T>,
    public resource: T,
    protected jsonToResourceFn: (json: any) => T
  ) {
    this.formBuilder = injector.get(FormBuilder);
    this.toastr = injector.get(ToastrService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.ngZone = injector.get(NgZone );
    this.resource = resource;
  }

  /** INITAL SETUP */

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
    this.buildForm();
  }
  
  ngAfterContentChecked(){
    this.setPageTitle();
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

  protected abstract buildForm(): void;

  protected abstract setPageTitle(): void;


  /** REST CALLS RELATED */

  loadResource(){
    if(this.currentAction == 'edit'){
      this.route.params.pipe(
        switchMap(params => this.service.getById(+params['id']))
      ).subscribe(
        success => this.actionsForSuccessLoad(success),
        error => this.actionsForFailure(error)
      );
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

  /** HANDLE RESPONSES */
  
  actionsForSuccess(success: any){
    console.log(success);
    this.showSuccessToast(success);
    this.navigateToParent();
  }

  actionsForSuccessLoad(success: any){
    this.resource = success;
    this.form.patchValue(success);
  }

  actionsForFailure(error: any){
    console.log('error: ', error);
    this.serverErrorMessages = error.error.errors;
  }

  showSuccessToast(success: any){
    const operation = this.currentAction == 'new' ? 'created' : 'edited';
    this.toastr.success('Success', success.name + ' was successfully ' + operation + '.');
  }

  /** UTIL METHODS */

  navigateToParent(){
    const parentUrl = this.route.snapshot.parent ? this.route.snapshot.parent.url[0].path : '';
    if(parentUrl){
      console.log(parentUrl);
      this.router.navigateByUrl(parentUrl);
    }
  }

  formatMask(value: string){
    return value.replace('.', ',');
  }

  unformatMask(value: string){
    return value.replace(',', '.');
  }

  setOnlyDigits(value: string){
    const isDigit = (c: string) => ((c >= '0' && c <= '9') || c == '.');

    let newValue = '';
    for(let c of value){
      if(isDigit(c)){
        newValue += c;
      }
    }
    return newValue;
  }

  fixPrecision(value: string, precision: number){
    let indexDecimal = value.indexOf('.');

    if(indexDecimal >= 0){
      if(value.length > indexDecimal + 4){
        return value.substr(0, indexDecimal + 4);
      }
    }
    return value;
  }

}
