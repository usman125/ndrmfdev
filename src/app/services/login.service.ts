import { Injectable }  from '@angular/core';
import { Router } from  '@angular/router';

@Injectable()
export class LoginService {

  constructor(private _router: Router){}

  loggedIn(){
    if (localStorage.getItem('user') !== null){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    var self = this;
    localStorage.removeItem('user')
    self._router.navigate(['/'])
  }

}