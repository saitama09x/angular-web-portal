import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    console.log("Popcorn has been injected!");
  }

   cookPopcorn(qty) {
    console.log(qty, "bags of popcorn cooked!");
  }

  
}
