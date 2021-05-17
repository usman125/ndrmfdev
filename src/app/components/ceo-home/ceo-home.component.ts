import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ceo-home',
  templateUrl: './ceo-home.component.html',
  styleUrls: ['./ceo-home.component.css']
})
export class CeoHomeComponent implements OnInit {

  apiLoading: any = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.reloadPage();
  }

  reloadPage() {
    // var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    // // Current Time //
    // var now = Date.now();
    // // Total Process Lenght as Minutes //
    // var tenSec = 10 * 1000;
    // // End Time of Process //
    // var plusTenSec = currentDocumentTimestamp + tenSec;
    // if (now > plusTenSec) {
    //   location.reload();
    // }
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
