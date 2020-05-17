import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sme-home',
  templateUrl: './sme-home.component.html',
  styleUrls: ['./sme-home.component.css']
})
export class SmeHomeComponent implements OnInit {

  qualiTaskCount: any = 0;
  Subscription: Subscription = new Subscription();
  apiLoading: boolean = false;

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    );
    this.getQualificationTasks();
  }

  getQualificationTasks() {
    this._authStore.setLoading();
    this._accreditationRequestService.getSmeTasks().subscribe(
      (result: any) => {
        // console.log("RESULT SME TASKS:--", result);
        // // result.
        // const array: any = result.qualification.map(c => {
        //   const date1: any = new Date();
        //   const date2: any = new Date(c.endDate);
        //   const diffTime = Math.abs(date2 - date1);
        //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //   console.log(diffTime + " milliseconds");
        //   console.log(diffDays + " days");
        //   return {
        //     ...c,
        //     expiry: diffDays
        //   }
        // });
        console.log("RESULT SME HOME TASKS:--", result);
        this.qualiTaskCount = result.qualification.length;
        this._authStore.removeLoading();
      },
      error => {
        console.log("ERROR SME HOME TASKS:--", error);
        this._authStore.removeLoading();
      }
    );
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
