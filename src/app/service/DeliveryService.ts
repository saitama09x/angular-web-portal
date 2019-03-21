import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {ProgressbarService} from './Progressbar'

@Injectable({
providedIn: 'root'
})

export class DeliveryService {

private token = null;
private header = null;
private user_id = null;
private ip_address = null;
private delivery_id  = null;

constructor(private http: HttpClient, 
	private progressbar : ProgressbarService) {
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

get_delivery(){
	this.progressbar.is_loading = true
	let data = {
	id : this.user_id
	}
	let res = this.http.post('http://'+this.ip_address+'/api/getdelivery', 
	data, {'headers' : this.header}).toPromise();
	let delivery_arr = [];
	res.then((result) => {
	let data = result['data'];
	for(let i in data){
	delivery_arr.push(
	{	
	'id' : data[i]['id'],
	'delivery_no' : data[i]['delivery_no'],
	'unit_no' : data[i]['unit_no'],
	'routes_details' : data[i]['routes_details'],
	'source' : data[i]['source'],
	'destination' : data[i]['destination'],
	'status' : data[i]['status'],
	}
	)
	}
	this.progressbar.is_loading = false
	});
	return delivery_arr;
}

getSingleDetail(id){
	this.progressbar.is_loading = true
	this.delivery_id = id
	let data = {
	deliv_id : id
	}
	let res = this.http.post('http://'+this.ip_address+'/api/getSingledelivery', 
	data, {'headers' : this.header}).toPromise();
	let data_arr = {};
	res.then((result)=>{
	let data = result['data']
	data_arr['source'] = data['source']
	data_arr['destination'] = data['destination']
	data_arr['routes_details'] = data['routes_details']
	this.progressbar.is_loading = false
	})
	return data_arr;
}

async saveDelivery(data){
	this.progressbar.is_loading = true
	data['account_id'] = this.user_id;

	let res = await this.http.post('http://'+this.ip_address+'/api/setdelivery',
	data, {'headers' : this.header}).toPromise();
	if(res['data'] == 1){
	this.progressbar.is_loading = false
	return true;
	}
	return false;
}

getDeliveryItems(){
	let data = {
		id : this.delivery_id
	}
	let res = this.http.post('http://'+this.ip_address+'/api/getDeliveryItems', 
	data, {'headers' : this.header}).toPromise();
	let item_arr = [];
	res.then((result)=>{
	let data = result['data']
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
		'quality' : data[i]['pixel_counts']
	}
	)	
	}
	})
	return item_arr;
}

async setDeliveryItems(data){

	let _data = {
		item_id : data.item_id,
		deliv_id : this.delivery_id
	}

	let res = await this.http.post('http://'+this.ip_address+'/api/setDeliveryItems', 
	_data, {'headers' : this.header}).toPromise();

	return res
}

async removeDeliveryItems(id){
	let data = {
		item_id : id
	}

	let res = await this.http.post('http://'+this.ip_address+'/api/removeDeliveryItems', 
	data, {'headers' : this.header}).toPromise();
	return res
}

}