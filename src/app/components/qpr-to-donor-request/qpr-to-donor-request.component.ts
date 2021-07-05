import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { QprToDonorRequestStore } from 'src/app/stores/qpr-to-donor-request/qpr-to-donor-request-store';
import { QprToDonorService } from '../../services/qpr-to-donor.service';

@Component({
  selector: 'app-qpr-to-donor-request',
  templateUrl: './qpr-to-donor-request.component.html',
  styleUrls: ['./qpr-to-donor-request.component.css'],
  providers: [ConfirmModelService]
})
export class QprToDonorRequestComponent implements OnInit {

  apiLoading: boolean = false;
  loggedUser = JSON.parse(localStorage.getItem('user'));
  selectedRequestId: any = null;
  selectedRequest: any = null;

  Subscription: Subscription = new Subscription();

  assignedSections: any = [];
  unAssignedSections: any = [];

  sectionStats: any = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _qprToDonorService: QprToDonorService,
    private _confirmModelService: ConfirmModelService,
    private _qprToDonorRequestStore: QprToDonorRequestStore,

  ) { }

  ngOnInit(): void {
    // this.apiLoading = true;
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
          let reAssignPendingCount = 0;
          let reAssignCompletedCount = 0;
          this.selectedRequest = data.request;

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

            if (element.data !== null) {
              completedCount = completedCount + 1;
            }

            if (element.reassignmentStatus === 'Pending' && element.data !== null) {
              reAssignPendingCount = reAssignPendingCount + 1;
            }

            if (element.reassignmentStatus === 'Completed' && element.data !== null) {
              reAssignCompletedCount = reAssignCompletedCount + 1;
            }


            this.sectionStats = {
              pendingCount,
              completedCount,
              reAssignPendingCount,
              reAssignCompletedCount,
            }

          });
          console.log("REQUEST FROM STORE:---", data.request, this.assignedSections, this.unAssignedSections, this.sectionStats);
        }
      )
    );
  }

  getRequestDetails() {
    this.apiLoading = true;
    console.log("SELECT DETAILS FOR REQUEST:--", this.selectedRequestId);
    this._qprToDonorService.getQprToDonorRequest(this.selectedRequestId).subscribe(
      (result: any) => {
        this.apiLoading = false;
        console.log("SINGLE QPR TO DONOR REQUEST:--", result);
        this._qprToDonorRequestStore.addRequest(result);
      },
      error => {
        this.apiLoading = false;
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

  fipIntimation() {
    let proposalSections = [];
    for (let i = 0; i < this.selectedRequest.sections.length; i++) {
      if ((this.selectedRequest.sections[i].reassignmentStatus === null ||
        this.selectedRequest.sections[i].reassignmentStatus === 'Completed') &&
        this.selectedRequest.sections[i].data !== null) {
        proposalSections.push(this.selectedRequest.sections[i]);
      }
    }
    let options = {
      title: 'Intimation to update sections',
      message: 'Please select section for SMEs to update',
      cancelText: 'CANCEL',
      confirmText: 'YES',
      confirm: false,
      add: false,
      proposal_sections: proposalSections,
      proposal_initmation: true,
      comments: null,
    };
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.apiLoading = true;
        let sectionIds = [];
        confirmed.sections.forEach(c => {
          sectionIds.push(c.id);
        });
        let object = {
          sectionIds: sectionIds,
          comments: confirmed.comments,
        }
        console.log("CONFIRMED DATA IS:---", sectionIds, confirmed, object);
        this._qprToDonorService.reassignQprToDonorSections(this.selectedRequestId, object).subscribe(
          (result: any) => {
            this.apiLoading = false;
            this._qprToDonorRequestStore.reassignQprToDonorSections(sectionIds, confirmed.comments);
            let options = {
              title: result.message,
              message: '',
              cancelText: 'CANCEL',
              confirmText: 'YES',
              confirm: false,
              add: true,
            };
            this._confirmModelService.open(options);
            console.log("RESULT AFTER RE-ASSIGN:--", result);
          },
          (error: any) => {
            this.apiLoading = false;
            let options = {
              title: error.error.message,
              message: 'Please contact your system administrator!',
              cancelText: 'CANCEL',
              confirmText: 'YES',
              confirm: false,
              add: true,
            };
            this._confirmModelService.open(options);
            console.log("RESULT AFTER RE-ASSIGN:--", error);
          }
        );
      }
    });
  }

  goBack() {
    this._router.navigate(['/qpr-to-donor']);
  }

}
