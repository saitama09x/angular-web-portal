import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { AgmCoreModule } from '@agm/core';

@Component({
	selector: 'output-home',
	templateUrl: './output/output.component.html',
	styles: [],
  providers: [UserService]
})
export class OutputComponent implements OnChanges, OnInit  {
  
  private _testvar : string = "";

  @Input()
  set testvar(test : string){
	if(test != ""){
		this._testvar = test;
	}
	else{
		this._testvar = "empty";
	}
  }

  get testvar() : string{
  	return this._testvar;
  }

  ngOnInit() {
  	console.log(this.testvar);
  }

  ngOnChanges(changes: SimpleChanges) {
  	const testvar : SimpleChange = changes.testvar;
  	console.log(testvar.currentValue);
  }

}

@Component({
  selector: 'pre-home',
  templateUrl: './home.component.html',
  styles: [`
  agm-map {
      height: 500px;
   }
  `]
})
export class HomeComponent implements OnInit {
  title = 'angular-material2';
  mode = new FormControl('side');
  regiForm: FormGroup;  
  FirstName : string = ''; 
  LastName : string = '';
  comment : string = '';
  selection : string = '';
  
  testvar2 : string = "this is sample";
  lat: number = 51.678418;
  lng: number = 7.809007;

  private postData = {
   grant_type: "client_credentials",
   client_id: 13,  
   client_secret: "47quFvhkTk4T9GmlY8VlUA4peUcUn6h3sFZ1m0d5",   
   username: "admin", 
   password: "admin123" 
 }

  private token_type = "";
  private access_token = "";

  constructor(private fb: FormBuilder, private userservice: UserService, private http: HttpClient) { 

  	this.regiForm = fb.group({  
      'FirstName' : [null, Validators.required],
      'LastName' : [null, Validators.required],
      'comment' : [null, Validators.required],
      'selection' : [null, Validators.required]
  	});

  }

  ngOnInit() {
      this.userservice.cookPopcorn(10);
  }

  onFormSubmit(form:NgForm)  
  {  

    this.http.post('http://localhost:8000/oauth/token', this.postData, {'headers' : new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
     })}).subscribe(data => {
        console.log(data);
        this.token_type = data["token_type"];
        this.access_token = data['access_token'];
        localStorage.setItem('token_type', this.token_type);
        localStorage.setItem('access_token', this.access_token);

    });

  } 

  clickme(){
    this.http.get('http://localhost:8000/api/add-item-2',  {'headers' : new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
     })}).subscribe(data => {
          console.log(data);
    });


  }


}
