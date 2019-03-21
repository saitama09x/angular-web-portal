import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {ProgressbarService} from './Progressbar'

@Injectable({
  providedIn: 'root'
})

export class UserService {

private token = null;
private header = null;
private user_id = null;
private ip_address = null;

constructor(private http: HttpClient, 
private progressbar : ProgressbarService) {
this.header = new HttpHeaders({
	'Content-Type': 'application/json',
	'Accept': 'application/json'
})

if(localStorage.hasOwnProperty("access_token") != false){
this.token = localStorage.getItem('access_token');
this.user_id = JSON.parse(localStorage.getItem("client_data"))["user_id"];
this.header = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Authorization' : 'Bearer ' + this.token
});
}

this.ip_address = "localhost:8000"
if(localStorage.hasOwnProperty("ip_address") != false){
	this.ip_address = localStorage.getItem("ip_address")
}

}

async userLogin(prop) {

this.progressbar.is_loading = true

let user = prop.controls.UserName.value;
let pass = prop.controls.PassWord.value;
let data = {
username : user,
password : pass
};

let header = new HttpHeaders();
header.append('Content-Type', 'application/json');
header.append('Accept', 'application/json');

let res = await this.http.post('http://'+this.ip_address+'/api/login2', data, {'headers' : header})
.toPromise()

if(res['data'] == false){
	return false
}

let _d = res['data']
let id = _d['id']
let secret = _d['secret']
let client = _d['client_data']

data = Object.assign({}, data, {
	'grant_type' : 'password',
    'client_id' : id,
    'client_secret' : secret,
    'username' : data.username,
    'password' : data.password,
    'scope' : '',	
})

let access = await this.http.post('http://'+this.ip_address+'/oauth/token', data, {'headers' : header}).toPromise()
if(access == null){
	return false
}

let user_key = access['access_token'];
let refresh_key = access['refresh_token'];
localStorage.setItem('id', id);
localStorage.setItem('access_token', user_key);
localStorage.setItem('refresh_token', refresh_key);
localStorage.setItem('client_data', JSON.stringify(client));
this.progressbar.is_loading = false
return true;

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

let res = await this.http.post('http://'+this.ip_address+'/api/user-add', postdata, {'headers' : header}).toPromise();

return res;

}

getAllUser(){
this.progressbar.is_loading = true
let res = this.http.get('http://'+this.ip_address+'/api/userlists',  {'headers' : this.header}).toPromise()
let data_arr = [];
res.then((result) => {
	let data  =  result['data'];
	for(let i in data){
		data_arr.push({
			'id' : data[i]['id'],
			'username' : data[i]['username'],
			'firstname' : data[i]['firstname'],
			'lastname' : data[i]['lastname'],
		})
	}
this.progressbar.is_loading = false
})
return data_arr
}

get_single_user(id){
let data = {
id : id
};
let res = this.http.post('http://'+this.ip_address+'/api/single-user', data, {'headers' : this.header}).toPromise();
return res;
}

deleteUser(id){
let data = {
user_id : id
}
let res = this.http.post('http://'+this.ip_address+'/api/delete-single-user', data, {'headers' : this.header}).toPromise();
return res;
}

updateUser(obj){

let data = {
user_id : obj.user_id,
fname : obj.fname,
lname : obj.lname,
user : obj.user,
pass : obj.pass
}

let res = this.http.post('http://'+this.ip_address+'/api/update-single-user', data, {'headers' : this.header}).toPromise();

return res;

}

}