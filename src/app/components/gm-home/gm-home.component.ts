import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gm-home',
  templateUrl: './gm-home.component.html',
  styleUrls: ['./gm-home.component.css']
})
export class GmHomeComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  goToRoute(route){
    this._router.navigate([route]);
  }

}
