import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public is_loading = true;

  constructor(private http: HttpClient) {
  
  }

  async userLogin(prop) {

  let user = prop.controls.UserName.value;
	let pass = prop.controls.PassWord.value;
	let data = {
		username : user,
		password : pass
	};

	let header = new HttpHeaders();
  	header.append('Content-Type', 'application/json');
  	header.append('Accept', 'application/json');

	let res = await this.http.post('http://localhost:8000/api/login', data, {'headers' : header})
		.toPromise()
    
	return res;
  
  }


  async sign_up(data){

    let fname = data.firstname;
    let lname = data.lastname;
    let uname = data.username;
    let pword = data.password;

    let postdata  = {
      firstname : fname,
      lastname : lname,
      username : uname,
      password : pword,
    };

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let res = await this.http.post('http://localhost:8000/api/user-add', postdata, {'headers' : header}).toPromise();

    return res;

  }

  async get_csrf(){
      let token = await localStorage.getItem('access_token');
      let res = this.http.get('http://localhost:8000/api/csrf-token',  {'headers' : new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
       })}).toPromise();

      return res;
  }

  async get_clients(){

    const data = {
        'form_params' : {
          'grant_type' : 'password',
          'client_id' : 10,
          'client_secret' : 'b0Na7MyrPHcHsT0BIWciOJYIz4weNSl2oxsP7HZh',
           'username' : 'admin1',
          'password' : 'admin123',
          'scope' : '*',
        }
    };
    
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let res = await this.http.post('http://localhost:8000/oauth/token', data, {'headers' : header}).toPromise();

    return res;
  
  }

  async userAdd(prop) {
    
    let fname = prop.controls.FirstName.value;
    let lname = prop.controls.LastName.value;
    let user = prop.controls.UserName.value;
    let pass = prop.controls.PassWord.value;
    let token = localStorage.getItem('access_token');
    
    let data = {
      firstname : fname,
      lastname : lname,
      username : user,
      password : pass,
    };

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    });


    let res = await this.http.post('http://localhost:8000/api/user-add', data, {'headers' : header}).toPromise();

    return res;

  }

  async updateUser(obj){

    let data = {
      user_id : obj.user_id,
      fname : obj.fname,
      lname : obj.lname,
      user : obj.user,
      pass : obj.pass
    }

    let token = localStorage.getItem('access_token');

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    });

    let res = await this.http.post('http://localhost:8000/api/update-single-user', data, {'headers' : header}).toPromise();

    return res;
     
  }


  async deleteUser(id){
      let token = localStorage.getItem('access_token');
      let data = {
          user_id : id
      }
      let header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + token
      });

      let res = await this.http.post('http://localhost:8000/api/delete-single-user', data, {'headers' : header}).toPromise();

      return res;
  }

  getAllUser(){
  		
      let token = localStorage.getItem('access_token');

  		let res = this.http.get('http://localhost:8000/api/userlists',  {'headers' : new HttpHeaders({
	    'Content-Type': 'application/json',
      'Accept': 'application/json',
	    'Authorization' : 'Bearer ' + token
	     })});

  		return res;
  }


   async get_single_user(id){
     let token = localStorage.getItem('access_token');
     let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer ' + token
    });
    
    let data = {
      id : id
    };

    let res = await this.http.post('http://localhost:8000/api/single-user', data, {'headers' : header}).toPromise();

    return res;

  }

}
