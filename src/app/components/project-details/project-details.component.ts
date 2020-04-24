import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { ProposalRequestsStore } from "../../stores/proposal-requests/proposal-requests-store";
import { Subscription } from "rxjs";
import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  proposalSections: any = [];
  proposalForms: any = [];
  proposalRequests: any = [];
  groupType: any = null;
  costTabsType: any = null;
  loggedUser: any = null;
  form: any = null;
  formSubmitData: any = null;
  selectedProject: any = null;
  selectedProjectId: any = null;
  sub: any = null;
  costSections = [
    {
      name: "Project Implementation Plan",
      key: 'pip'
    },
    {
      name: "Result Framework",
      key: 'rf'
    },
  ]

  @Output() show: any = null;

  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
    private _proposalRequestsStore: ProposalRequestsStore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { 
    
  }

  ngOnInit(): void {
    this.sub = this._activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);
        // Defaults to 0 if no query param provided.
        this.selectedProjectId = params['projectId'] || null;
        console.log("SELCTED PROJECT ID IS:--", this.selectedProjectId);
      });

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._proposalFormsStore.state$.subscribe(data => {
        this.proposalForms = data.forms;
        console.log("PROPOSAL FORMS:---", this.proposalForms);
        // this.groupType = this.proposalSections[0].name;
      })
    );
    this.Subscription.add(
      this._proposalRequestsStore.state$.subscribe(data => {
        this.proposalRequests = data.proposals;
        console.log("PROPOSAL Requests:---", this.proposalRequests);
        // this.groupType = this.proposalSections[0].name;
        // for (let i = 0; i < this.proposalRequests.length; i++) {
        //   if (this.proposalRequests[i].formIdentity === this.groupType &&
        //     this.loggedUser.username === this.proposalRequests[i].userRef
        //   ) {
        //     this.formSubmitData = this.proposalRequests[i].formSubmitData;
        //   }
        // }
      })
    );
    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe(data => {
        // this.proposalSections = data.sections;
        var dummySections = [];
        if (data.sections) {
          for (let i = 0; i < data.sections.length; i++) {
            var object = {
              formGenerated: data.sections[i].formGenerated,
              key: data.sections[i].key,
              name: data.sections[i].name,
              userRef: data.sections[i].userRef,
              form: null,
            }
            dummySections.push(object);
          }
        }
        this.proposalSections = dummySections;
        if (this.proposalSections.length) {
          this.groupType = this.proposalSections[0].key;
          for (let i = 0; i < this.proposalForms.length; i++) {
            if (this.proposalForms[i].smeRef === this.proposalSections[0].key) {
              this.proposalSections[0].form = this.proposalForms[i];
              this.form = this.proposalForms[i];
            }
          }
          for (let i = 0; i < this.proposalRequests.length; i++) {
            if (this.proposalRequests[i].formIdentity === this.proposalSections[0].key &&
              this.loggedUser.username === this.proposalRequests[i].userRef
            ) {
              this.formSubmitData = this.proposalRequests[i].formSubmitData;
            }
          }
        }
        console.log("PROPOSALS:---", this.proposalSections);
      })
    );
    currentProjectReplay.subscribe(data => {
      this.selectedProject = data;
      console.log("SELECTED PROJECT:---", this.selectedProject)
    });
  }

  getSelectedValues(item) {
    return item;
  }


  costTabChanged(item) {
    console.log("COST TAB CHANGED:--", item);
    this.show = item.key
  }

  tabChanged($event) {
    this.formSubmitData = null;
    this.form = null;
    for (let i = 0; i < this.proposalForms.length; i++) {
      if (this.proposalForms[i].smeRef === $event.key) {
        this.form = this.proposalForms[i];
        for (let j = 0; j < this.proposalRequests.length; j++) {
          if (this.proposalRequests[j].formIdentity === $event.key &&
            this.loggedUser.username === this.proposalRequests[j].userRef
          ) {
            this.formSubmitData = this.proposalRequests[j].formSubmitData;
            break;
          }
        }
        break;
      }
    }
    console.log(this.groupType);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.Subscription.unsubscribe();
  }

  onSubmit($event) {
    console.log("FORM SUBMIT:---", $event);


    this.formSubmitData = $event.data;
    // var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.username, formIdentity: this.groupType })
    // if (!flag) {
    //   var values = {
    //     "currentReview": null,
    //     "endDate": null,
    //     "formData": 'values',
    //     "formIdentity": this.form.formIdentity,
    //     "formSubmitData": this.secondForm,
    //     "prevReview": null,
    //     "ratings": 0,
    //     "requestKey": 'qualification',
    //     "sectionKey": this.groupType,
    //     "startDate": null,
    //     "status": 'pending',
    //     "userName": this.loggedUser.username,
    //     "userUpdateFlag": false
    //   }
    //   console.log("T+REQUEST FOR API:---", values);
    //   this._accreditationRequestService.addAccreditationRequest(values).subscribe(
    //     result => {
    //       this.form.exists = true;
    //       console.log("RESULT AFTER ADDING REQUEST:--", result);
          this._proposalRequestsStore.addProposalRequest(
            this.loggedUser.username,
            $event.data,
            this.groupType,
          );
          // this.getRequestsFromApi();
      //   },
      //   error => {
      //     console.log("ERROR AFTER ADDING REQUEST:--", error);
      //   }
      // );
  }

}
