import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-po-home',
  templateUrl: './po-home.component.html',
  styleUrls: ['./po-home.component.css']
})
export class PoHomeComponent implements OnInit {

  eligiUnderReviewCount: any = 0;
  eligiApprovedCount: any = 0;

  qualiUnderReviewCount: any = 0;
  qualiApprovedCount: any = 0;

  apiLoading: boolean;

  Subscription: Subscription = new Subscription();

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
      
    this.eligiApproved();
    this.eligiUnderReview();

    this.qualiApproved();
    this.qualiUnderReview();
  }

  eligiApproved() {
    this._authStore.setLoading();
    this._accreditationRequestService.getApprovedEligibilityRequest().subscribe(
      (result: any) => {
        console.log("RESULT APPROVED ELIGI:---", result);
        this.eligiApprovedCount = result.length;
        this._authStore.removeLoading();
      },
      (error: any) => {
        this._authStore.removeLoading();
        console.log("ERROR APPROVED ELIGI:---", error);
      }
    );
  }
  
  eligiUnderReview() {
    this._authStore.setLoading();
    this._accreditationRequestService.getUnderReviewEligibilityRequest().subscribe(
      (result: any) => {
        console.log("RESULT APPROVED ELIGI:---", result);
        this.eligiUnderReviewCount = result.length;
        this._authStore.removeLoading();
      },
      (error: any) => {
        this._authStore.removeLoading();
        console.log("ERROR APPROVED ELIGI:---", error);
      }
    );

  }

  qualiApproved() {
    this._authStore.setLoading();
    this._accreditationRequestService.getApprovedQulificationRequests().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", result);
        this.qualiApprovedCount = result.length;
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", error);
      }
    );

  }

  qualiUnderReview() {
    this._authStore.setLoading();
    this._accreditationRequestService.getUnderReviewQulificationRequests().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", result);
        this.qualiUnderReviewCount = result.length;
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", error);
      }
    );

  }

  goToRoute(route){
    this._router.navigate([route]);
  }

}
