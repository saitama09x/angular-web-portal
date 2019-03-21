import { Component, NgZone, Injector, OnInit, ViewChild, AfterViewInit,
	Input, OnChanges, SimpleChanges, SimpleChange, ViewContainerRef, TemplateRef } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { SignUpComponent } from './../users/sign-up.component';
import { UserService } from './../service/UserService';
import {ProgressbarService} from './../service/Progressbar'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Location } from '@angular/common';

@Component({
selector: 'login-view',
templateUrl: './login.component.html',
styles: [],
providers: [UserService]
})

export class LoginComponent implements  OnInit, AfterViewInit  {

public loginForm : FormGroup
public has_progress : boolean = false

@ViewChild('container', {read: ViewContainerRef}) 
container : ViewContainerRef;

@ViewChild('login')
private login : TemplateRef<any>

@ViewChild('dashboard')
private dashboard : TemplateRef<any>

private has_sidenav = true;

constructor(private fb: FormBuilder, 
private userservice : UserService,
private router: Router,
private dialog: MatDialog,
private injector: Injector,
private location: Location){

this.loginForm = fb.group({  
'UserName' : [null, Validators.required],
'PassWord' : [null]
});

}

ngOnInit() {

}

ngAfterViewInit(){
	if(localStorage.hasOwnProperty("access_token") != false){
		this.container.createEmbeddedView(this.dashboard)
	}else{
		this.container.createEmbeddedView(this.login)
	}
}

async onFormSubmit(form:NgForm) {
	
let login = await this.userservice.userLogin(form);
this.has_progress = true

if(login){
	window.location.reload();
	return true;
}

alert("wrong username and password");
this.has_progress = false

}

signUpDialog(){
let dialogRef = this.dialog.open(SignUpComponent, {
width : '30%',
role : 'alertdialog'
});
}

}

@Component({
selector: 'logout-view',
template: '<p>Your Logout</p>',
styles: [],
providers: [UserService]
})

export class LogoutComponent implements  OnInit  {

constructor(private router: Router){}

ngOnInit() {
localStorage.clear();
let protocol = window.location.protocol
let hostname = window.location.hostname
let port = window.location.port
console.log("http://" + hostname + ":" + port);
window.location.assign("http://" + hostname + ":" + port);
// this.router.navigate(['/']);
}
}

@Component({
selector: 'config-view',
templateUrl: './config.component.html',
styles: [],
providers: [UserService]
})

export class ConfigComponent implements  OnInit  {

private ip_address : string = ""

constructor(private progressbar : ProgressbarService){

}

ngOnInit() {

}

update_address(){
	localStorage.setItem('ip_address', this.ip_address);
	alert("IP Updated")
}

}