import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmeStore } from "../../stores/sme/sme-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sme',
  templateUrl: './sme.component.html',
  styleUrls: ['./sme.component.css']
})
export class SmeComponent implements OnInit, OnDestroy {


  public displayedColumns = ['name', 'userRef', 'actions'];
  public dataSource: any = [];
  public allSmes: any = [];
  public Subscription: Subscription = new Subscription();

  constructor(
    private _smesStore: SmeStore,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('SMES')
    })
    this.Subscription.add(
      this._smesStore.state$.subscribe((data) => {
        this.allSmes = data.smes;
        this.dataSource = this.allSmes;
      })
    )
  }

  goToAdd(){
    this._router.navigate(['/add-sme']);
  }

  ngOnDestroy(){

  }

}
