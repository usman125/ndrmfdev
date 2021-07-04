import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QprToDonorRequestStore } from 'src/app/stores/qpr-to-donor-request/qpr-to-donor-request-store';
import { QprToDonorService } from '../../services/qpr-to-donor.service';

@Component({
  selector: 'app-qpr-to-donor-request',
  templateUrl: './qpr-to-donor-request.component.html',
  styleUrls: ['./qpr-to-donor-request.component.css']
})
export class QprToDonorRequestComponent implements OnInit {

  apiLoading: boolean = false;
  loggedUser = JSON.parse(localStorage.getItem('user'));
  selectedRequestId: any = null;

  Subscription: Subscription = new Subscription();

  assignedSections: any = [];
  unAssignedSections: any = [];

  sectionStats: any = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _qprToDonorService: QprToDonorService,
    private _qprToDonorRequestStore: QprToDonorRequestStore,

  ) { }

  ngOnInit(): void {
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      this.getRequestDetails();
    });
    this.Subscription.add(

      this._qprToDonorRequestStore.state$.subscribe(
        data => {
          this.assignedSections = [];
          this.unAssignedSections = [];
          let pendingCount = 0;
          let completedCount = 0;

          data.request && data.request.sections.forEach(element => {

            typeof (element.template) === 'string' ?
              element.template = JSON.parse(element.template) : element.template = element.template

            typeof (element.data) === 'string' ?
              element.data = JSON.parse(element.data) : element.data = element.data

            if (element.assigned) {
              this.assignedSections.push(element);
            } else {
              this.unAssignedSections.push(element);
            }

            if (element.reassignmentStatus === null && element.data === null) {
              pendingCount = pendingCount + 1;
            }

            if (element.reassignmentStatus === 'Completed' && element.data !== null) {
              completedCount = completedCount + 1;
            }

            if (element.reassignmentStatus === 'Pending' && element.data !== null) {
              pendingCount = pendingCount + 1;
            }

            this.sectionStats = {
              pendingCount,
              completedCount,
            }

          });
          console.log("REQUEST FROM STORE:---", data.request, this.assignedSections, this.unAssignedSections, this.sectionStats);
        }
      )
    );
  }

  getRequestDetails() {
    console.log("SELECT DETAILS FOR REQUEST:--", this.selectedRequestId);
    this._qprToDonorService.getQprToDonorRequest(this.selectedRequestId).subscribe(
      (result: any) => {
        console.log("SINGLE QPR TO DONOR REQUEST:--", result);
        this._qprToDonorRequestStore.addRequest(result);
      },
      error => {
        console.log("SINGLE QPR TO DONOR REQUEST:--", error);
      }
    )
  }

  onSubmit($event, id) {
    this.apiLoading = true;
    console.log("SUBMITTED FORM DATA:--", $event);
    this._qprToDonorService.addProjectRequest(
      {
        data: JSON.stringify($event.data),
        id: id
      },
      this.selectedRequestId
    ).subscribe(
      result => {
        // this._proposalSectionsStore.updateSectionReview(this.formSubmitData, this.groupType.id);
        this._qprToDonorRequestStore.updateSectionReview($event.data, id);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR ADDING REQUEST:--", error);
      }
    );
  }

  goBack() {
    this._router.navigate(['/qpr-to-donor']);
  }

}
