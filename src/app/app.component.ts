import { Component, ViewChild, AfterViewInit, OnInit, ViewContainerRef, TemplateRef, ComponentFactoryResolver  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MessageService} from './home/message.service';
import { Router } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent, LogoutComponent, ConfigComponent } from './login/login.component';
import {ProgressbarService} from './service/Progressbar';
import { DeliveryComponent, AddDeliveryComponent, DeliveryDetailComponent } from './delivery/delivery.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

  private title = 'angular-material2';
  private mode = new FormControl('push');
  private load_topbar = false;
  private template_name : String = "";
  private has_sidenav = false;

  constructor(
    private msgserv : MessageService, 
    private resolver: ComponentFactoryResolver, 
    private router: Router,
    private progressbar : ProgressbarService){
     

  }

  ngOnInit() {
      
  }



  ngAfterViewInit() {
    
  }

  update_topbar($event){
      console.log($event);
  }

  activaterouter(e : any){
    
    if(!(e instanceof LoginComponent)){
      if(!(e instanceof ConfigComponent)){
        if(!localStorage.getItem('access_token')){
          this.router.navigate(['/login']);
        } 
        this.has_sidenav = true;
      }
    }
    else{
      if(localStorage.hasOwnProperty("client_data") != false){
        this.has_sidenav = true;
      }
    }

    if(e instanceof LogoutComponent){
      this.has_sidenav = false;
    }

  }

  onDeactivate(e : any){
    console.log("deactivate");
  }
}

