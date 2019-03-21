import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pre-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav-menu.scss']
})
export class NavComponent implements OnInit {

  private username:string=''

  constructor() { }

  ngOnInit() {
    if(localStorage != undefined){
        let client_data = JSON.parse(localStorage.getItem("client_data"));
        this.username = client_data['name']
    }
  }

  mode = new FormControl('side');
  activeClass : string = '';
  is_active = {};
  active_val = {'first' : false};

  toggle(typeClass : string){
    this.activeClass = typeClass;    
    if(typeof this.is_active[typeClass] == "undefined"){
        this.is_active[typeClass] = true;
        return;
    }

    if(this.is_active[typeClass]){
       this.is_active[typeClass] = false;
    }else{
       this.is_active[typeClass] = true;
    }

  }

}
