import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-closure-request',
  templateUrl: './project-closure-request.component.html',
  styleUrls: ['./project-closure-request.component.css'],
  providers: [ConfirmModelService]
})
export class ProjectClosureRequestComponent implements OnInit {

  loggedUser = JSON.parse(localStorage.getItem('user'));
  apiLoading: boolean = false;
  selectedProjectId: any = null;
  allRequests: any = [];

  assignedSections: any = [];
  unAssignedSections: any = [];

  allTasksSubmitted: any = null;
  // apiLoading: boolean = false;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("ALL CLOSURE REQUESTS ON PROPOSAL:--", this.selectedProjectId);
      this.getProjectClosureDetails();
    });
  }

  getProjectClosureDetails() {
    this.apiLoading = true;
    this._projectService.getProjectClosureByProposalId(this.selectedProjectId).subscribe(
      (result: any) => {
        this.allRequests = result.sort((a, b) => (a.orderNum > b.orderNum) ? 1 : ((b.orderNum > a.orderNum) ? -1 : 0))

        this.allRequests = this.allRequests.map((c) => {
          if (c.assigned)
            this.assignedSections.push(c);
          else
            this.unAssignedSections.push(c);
          if (c.orderNum === 1) {
            if (c.generalFields === null) {

              return {
                ...c,
                generalFields: {
                  pip: false,
                  rf: false,
                  reports: false,
                  qpr: false,
                  saemr: false,
                  samr: false,
                }
              }
            } else {
              return {
                ...c,
                generalFields: JSON.parse(c.generalFields)
              }
            }
          }
          if (c.orderNum === 2) {
            if (c.generalFields === null) {

              return {
                ...c,
                generalFields: {
                  lcc: false,
                  pppr: false,
                }
              }
            } else {
              return {
                ...c,
                generalFields: JSON.parse(c.generalFields)
              }
            }
          }
          if (c.orderNum === 3) {
            if (c.generalFields === null) {
              return {
                ...c,
                generalFields: {
                  pipDone: false,
                  soesDone: false,
                  liquidationDone: false,
                }
              }
              // return {
              //   ...c,
              //   generalFields: {
              //     pip: false,
              //     rf: false,
              //     reports: false,
              //     qpr: false,
              //     saemr: false,
              //     samr: false,
              //   }
            } else {
              return {
                ...c,
                generalFields: JSON.parse(c.generalFields)
              }
            }
          }
          if (c.orderNum === 4) {
            if (c.generalFields === null) {
              return {
                ...c,
                generalFields: {
                  pip: false,
                  rf: false,
                  reports: false,
                  qpr: false,
                  saemr: false,
                  samr: false,
                }
              }
              // return {
              //   ...c,
              //   generalFields: {
              //     pipDone: false,
              //     soesDone: false,
              //     liquidationDone: false,
              //   }
              // }
            } else {
              return {
                ...c,
                generalFields: JSON.parse(c.generalFields)
              }
            }
          }
        });
        this.allTasksSubmitted = this.allRequests.filter((c) => {
          return c.status === 'Pending'
        });
        this.apiLoading = false;
        console.log("ALL CLOSURE REQUESTS ON PROPOSAL:--\n",
          "\n", this.allRequests,
          "\n", this.assignedSections,
          "\n", this.unAssignedSections,
          "\n", this.allTasksSubmitted);
      },
      error => {
        this.apiLoading = false;
        console.log("ALL CLOSURE REQUESTS ON PROPOSAL:--", error);
      }
    )
  }

  submitProjectClosureTask(task) {
    this.apiLoading = true;
    const options = {
      title: '',
      message: '',
      confirmText: 'OK',
      cancelText: 'OK',
      add: true,

    }
    let body = {
      data: JSON.stringify(task.generalFields),
      proposalId: this.selectedProjectId
    }
    console.log("RESULT AFTER SUBMITTING TASK:-", body);
    this._projectService.submitProjectClosureTask(task.id, body).subscribe(
      (result: any) => {
        options.title = result.message;
        this._confirmModelService.open(options);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          this.apiLoading = false;
          task.status = 'Completed';
        })
        console.log("RESULT AFTER SUBMITTING TASK:-", result);
      },
      error => {
        console.log("RESULT AFTER SUBMITTING TASK:-", error);
      }
    );
  }

  getLabel(item) {
    if (item.orderNum === 1) {
      return 'M & E'
    }
    if (item.orderNum === 2) {
      return 'GIA'
    }
    if (item.orderNum === 3) {
      return 'PAM'
    }
  }

  markProjectClosureToCeo() {
    this.apiLoading = true;
    const options = {
      title: '',
      message: '',
      confirmText: 'OK',
      cancelText: 'OK',
      add: true,

    }
    this._projectService.markProjectClosureToCeo(
      this.allRequests[0].closureId
    ).subscribe((result: any) => {
      options.title = result.message;
      this._confirmModelService.open(options);
      this._confirmModelService.confirmed().subscribe(confirmed => {
        console.log("RESULT AFTER SUBMITTING TASK:-", result);
        this.allRequests[0].markedToStatus = 'Pending';
        this.apiLoading = false;
      })
    }, error => {
      console.log("RESULT AFTER SUBMITTING TASK:-", error);
    });
  }

  projectClosureCeoApproval() {
    const options = {
      title: '',
      message: '',
      confirmText: 'OK',
      cancelText: 'CANCEL',
      ceoDecision: true,
      confirmComments: true,
    }
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.apiLoading = true;
        let body = {
          comment: confirmed.comments
        };
        console.log("CONFIRMED FROM MODEL:--", confirmed);
        this._projectService.projectClosureCeoApproval(
          this.allRequests[0].closureId,
          confirmed.status,
          body,
        ).subscribe((result: any) => {
          const options = {
            title: result.message,
            message: '',
            confirmText: 'OK',
            cancelText: 'OK',
            add: true,
          }
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            console.log("RESULT AFTER SUBMITTING TASK:-", result);
            this.allRequests[0].markedToStatus = 'Completed';
            this.allRequests[0].markedToSubStatus = confirmed.status;
            this.allRequests[0].markedToComments = confirmed.comments;
            this.apiLoading = false;
          })
        }, error => {
          const options = {
            title: error.error.message,
            message: '',
            confirmText: 'OK',
            cancelText: 'OK',
            add: true,
          }
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            console.log("RESULT AFTER SUBMITTING TASK:-", error);
            this.apiLoading = false;
          })
        });
      }
    })
  }

  checkUser() {
    if (this.loggedUser?.processNames?.indexOf('PROJECT_PROPOSAL') > -1) {
      return true;
    }
    return false;
  }

}
