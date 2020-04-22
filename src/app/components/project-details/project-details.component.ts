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
  costTabsType: any = null;
  form: any = null;
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
        if (this.proposalSections.length) this.groupType = this.proposalSections[0].name;
        console.log("PROPOSALS:---", this.proposalSections);
      })
    );
  }

  getSelectedValues(item) {
    return item;
  }


  costTabChanged(item) {
    console.log("COST TAB CHANGED:--", item);
  }

  tabChanged($event) {
    for (let i = 0; i < this.proposalForms.length; i++) {
      if (this.proposalForms[i].smeRef === $event.key) {
        this.form = this.proposalForms[i];
        break;
      } else {
        this.form = null;
      }
    }
    console.log($event);
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  onSubmit($event) {
    console.log("FORM SUBMIT:---", $event);
  }

}
