import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  proposalSections: any = [];
  proposalForms: any = [];
  groupType: any = null;

  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._proposalFormsStore.state$.subscribe(data => {
        this.proposalForms = data.forms;
        console.log("PROPOSAL FORMS:---", this.proposalForms);
        // this.groupType = this.proposalSections[0].name;
      })
    );
    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe(data => {
        this.proposalSections = data.sections;
        console.log("PROPOSALS:---", this.proposalSections);
        this.groupType = this.proposalSections[0].name;
      })
    );
  }

  getSelectedValues(item) {
    return item;
  }


  tabChanged($event) {

  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

}
