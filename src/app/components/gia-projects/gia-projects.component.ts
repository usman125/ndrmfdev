import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { FormControl } from "@angular/forms";
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectService } from 'src/app/services/project.service';

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

  apiLoading: boolean = false;

  appraisalDoc: any = [

  ];

  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _projectsStore: ProjectsStore,
  ) { }

  ngOnInit() {

    // this.Subscription.add(
    //   this._proposalSectionsStore.state$.subscribe(data => {
    //     setTimeout(() => {
    //       this.allProposalSections = data.sections;
    //     })
    //   })
    // );
    // this.Subscription.add(
    //   this._proposalFormsStore.state$.subscribe(data => {
    //     setTimeout(() => {
    //       this.allProposalForms = data.forms;
    //     })
    //   })
    // );
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        console.log("SELECTED PROJECT IN STORE:--", this.selectedProject);
        if (this.selectedProject) {
          if (this.selectedProject.gia.data !== null) {
            if (typeof (this.selectedProject.gia.data) === 'string') {
              this.appraisalDoc = JSON.parse(this.selectedProject.gia.data);
            } else {
              this.appraisalDoc = this.selectedProject.gia.data;
            }
          }
        }
        // if (this.selectedProject && this.selectedProject.commentsMatrix) {
        //   this._accreditationCommentsMatrixStore.addCommentsArray(this.selectedProject.commentsMatrix);
        // }
        // if (this.selectedProject &&
        //   this.selectedProject.extendedAppraisal &&
        //   this.selectedProject.extendedAppraisal !== null) {
        //   this._extendedAppraisalSmesStore.addAppraisal(this.selectedProject.extendedAppraisal);
        // }
      })
    );
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("SELCTED PROJECT ID IN GIA IS:--", this.selectedProjectId);
    });

  }

  smeChanged($event) {
    console.log("SME CHNAGED:--", $event);
  }

  addSection() {
    var object = {
      content: this.content,
      forms: null
    }
    for (let i = 0; i < this.sections.value.length; i++) {
      if (typeof (this.sections.value[i].template) === 'string') {
        this.sections.value[i].template = JSON.parse(this.sections.value[i].template);
      } else {
        this.sections.value[i].template = this.sections.value[i].template;
      }
      if (typeof (this.sections.value[i].data) === 'string') {
        this.sections.value[i].data = JSON.parse(this.sections.value[i].data);
      } else {
        this.sections.value[i].data = this.sections.value[i].data;
      }
    }
    object.forms = this.sections.value;
    this.appraisalDoc.push(object);
    console.log("APPRESIAL DOC:--", this.appraisalDoc);
    this.content = null;
    this.sections.reset();
  }

  submitGia() {
    this._projectService.submitGia(this.selectedProjectId, { data: JSON.stringify(this.appraisalDoc) }).subscribe(
      (result: any) => {
        console.log("RESULT AFTER SUBMIT GIA:---", result);
      },
      error => {
        console.log("RESULT AFTER SUBMIT GIA:---", error);
      }
    );
  }

  removeEntry(i) {
    this.appraisalDoc.splice(i, 1);
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
