import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-gia-projects',
  templateUrl: './gia-projects.component.html',
  styleUrls: ['./gia-projects.component.css']
})
export class GiaProjectsComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();

  allProposalSections: any = [];
  allProposalForms: any = [];
  selectedProjectId: any = null;
  selectedProject: any = null;
  content: any = null;
  sections = new FormControl();

  appraisalDoc: any = [

  ];

  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _projectsStore: ProjectsStore,
  ) { }

  ngOnInit() {

    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe(data => {
        setTimeout(() => {
          this.allProposalSections = data.sections;
        })
      })
    );
    this.Subscription.add(
      this._proposalFormsStore.state$.subscribe(data => {
        setTimeout(() => {
          this.allProposalForms = data.forms;
        })
      })
    );
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // for (let i=0; i< this.allPro)
      console.log(this._projectsStore.getProject(this.selectedProjectId));
      this.selectedProject = this._projectsStore.getProject(this.selectedProjectId);
    });
    console.log("SELCTED PROJECT ID IS:--", this.selectedProjectId);

  }

  smeChanged($event){
    console.log("SME CHNAGED:--", $event);
  }

  addSection(){
    var object = {
      content: this.content,
      forms: null
    }
    let tempForms = [];
    for (let i=0; i< this.sections.value.length; i++){
      for (let j = 0; j < this.allProposalForms.length;j++){
        if (this.sections.value[i].key === this.allProposalForms[j].smeRef){
          tempForms.push(this.allProposalForms[j]);
        }
      }
    }
    object.forms = tempForms;
    this.appraisalDoc.push(object);
    console.log("APPRESIAL DOC:--", this.appraisalDoc);
    this.content = null;
    this.sections.reset();
  }

  removeEntry(i){
    this.appraisalDoc.splice(i, 1);
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}