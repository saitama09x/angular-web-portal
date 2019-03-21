import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {ProgressbarService} from './Progressbar'

@Injectable({
  providedIn: 'root'
})

export class LocationService {

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

  async set_location(data){
    let res = await this.http.post('http://'+this.ip_address+'/api/setlocation', data,
      {'headers' : this.header}).toPromise();

    if(res['data'] != 0){
        return res['data'];
    }
    return false;
  }

  async get_location(delivery_id){
    this.progressbar.is_loading = true
  	let data = {
  		id : delivery_id
  	}
  	let res = await this.http.post('http://'+this.ip_address+'/api/getlocation', 
    	data, {'headers' : this.header}).toPromise();
  	let location_arr = [];
		let location = res['data'];
		for(let i in location){
			location_arr.push(
			{
				'id' : location[i]['id'],
        'delivery_id' : location[i]['delivery_id'],
				'latitude' : location[i]['latitude'],
				'longitude' : location[i]['longitude'],
        'label' : {
          color : "black",
          fontWeight : "bold",
          text : location[i]['datecreated']
        }
			}
			)
  		}
    this.progressbar.is_loading = false
    return location_arr;
  }

  async set_tracked(data){
    let res = await this.http.post('http://'+this.ip_address+'/api/settrack', 
      data, {'headers' : this.header}).toPromise()
  }

  async get_tracked(id){
    let data = {
  		id : id
  	}
    let res = await this.http.post('http://'+this.ip_address+'/api/gettracked', data,
    	{'headers' : this.header}).toPromise();

    let polylines = [];

    	let position = res['data'];
    	for(var i in position){
          let _lat : number = position[i].latitude;
          let _long : number = position[i].longitude;
          let _date : String = position[i].datecreated;
          polylines.push({
            latitude : _lat,
            longitude : _long,
            icon: 'assets/images/truck.png',
            label : {
            	color : "black",
            	fontWeight : "bold",
            	text : _date
            }
          });
      }
    return polylines;
  
  }

}