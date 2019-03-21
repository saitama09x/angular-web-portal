import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {ProgressbarService} from './Progressbar'

@Injectable({
providedIn: 'root'
})

export class ItemsService{

private token = null;
private header = null;
private user_id = null;
private ip_address = null;

constructor(private http: HttpClient, private progressbar : ProgressbarService) {
this.token = localStorage.getItem('access_token');
this.user_id = JSON.parse(localStorage.getItem("client_data"))["user_id"];
this.header = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Authorization' : 'Bearer ' + this.token
});
this.ip_address = "localhost:8000"
if(localStorage.hasOwnProperty("ip_address") != false){
	this.ip_address = localStorage.getItem("ip_address")
}
}

get_all_items(){
this.progressbar.is_loading = true
let data = {
id : this.user_id
}
let res = this.http.post('http://'+this.ip_address+'/api/getItems', 
data, {'headers' : this.header}).toPromise();	
let item_arr = [];
res.then((result) => {
let data = result['data'];
for(let i in data){
let datecreated = data[i]['datecreated'];
let parse_date = Date.parse(datecreated)
let date = new Date(parse_date);
date.setDate(date.getDate() + data[i]['life'])

item_arr.push(
{
	'id' : data[i]['id'],
	'item_id' : data[i]['item_id'],
	'weight' : data[i]['weight'],
	'height' : data[i]['height'],
	'width' : data[i]['width'],
	'qty' : data[i]['qty'],
	'front' : data[i]['front'],
	'back' : data[i]['back'],
	'ripen' : date,
	'quality' : data[i]['quality']
}
)	
}
this.progressbar.is_loading = false
});
return item_arr
}

get_item_not_delivery(){
let data = {
id : this.user_id
}	
let res = this.http.post('http://'+this.ip_address+'/api/getItemNotDeliver', 
data, {'headers' : this.header}).toPromise();	
let item_arr = [];
res.then((result) => {
let data = result['data'];
for(let i in data){
let datecreated = data[i]['datecreated'];
let parse_date = Date.parse(datecreated)
let date = new Date(parse_date);
date.setDate(date.getDate() + data[i]['life'])

item_arr.push(
{
	'id' : data[i]['id'],
	'item_id' : data[i]['item_id'],
	'weight' : data[i]['weight'],
	'height' : data[i]['height'],
	'width' : data[i]['width'],
	'qty' : data[i]['qty'],
	'front' : data[i]['front'],
	'back' : data[i]['back'],
	'ripen' : date,
	'quality' : data[i]['pixel_count']
}
)	
}
this.progressbar.is_loading = false
});
return item_arr

}

}