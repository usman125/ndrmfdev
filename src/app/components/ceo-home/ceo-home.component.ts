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
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
