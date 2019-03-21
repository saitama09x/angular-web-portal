import { Component, ViewChild, OnInit, AfterViewInit, 
	Input, Output, OnChanges, SimpleChanges, 
	SimpleChange, ViewContainerRef, 
	TemplateRef, ComponentFactoryResolver, 
	EventEmitter, Inject, AfterViewChecked } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor, HttpClientXsrfModule  } from '@angular/common/http';
import { Location, DOCUMENT  } from '@angular/common';
import { LoginComponent } from './../login/login.component';
import { UserService } from './../service/UserService';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
selector: 'sign-up-view',
templateUrl: './sign-up-view.component.html',
styles: [],
providers: [UserService]
})
export class SignUpComponent implements  OnInit, AfterViewChecked {
	
	private mode = new FormControl('side');
	private form : FormGroup

	constructor(private userservice : UserService, 
		private viewContainer: ViewContainerRef, 
		private fb: FormBuilder,
		private userservice2 : UserService,
		private dialogRef: MatDialogRef<LoginComponent>){

		this.form = fb.group({ 
		  	'FirstName' : [null, Validators.required],
			'LastName' : [null, Validators.required], 
	      	'UserName' : [null, Validators.required],
	      	'PassWord' : [null, Validators.required]
	  	});

	}

	ngOnInit(){

  	}

  	ngAfterViewChecked(){
  		
  	}

  	async SignUp(form : NgForm){
  		let controls = form.controls;

  		let data = {
  			firstname : controls.FirstName.value,
  			lastname : controls.LastName.value,
  			username : controls.UserName.value,
  			password : controls.PassWord.value
  		}

  		let res = await this.userservice2.sign_up(data);

  		if(res){
  			let grant = res['data'];
  			if(grant.hasOwnProperty("client_secret")){
  				this.dialogRef.close();
  			}
  		}
  	}

}