import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectsStore } from '../../stores/projects/projects-store';
import * as _ from 'lodash';
import { SettingsService } from '../../services/settings.service';
import FormioUtils from 'formiojs/utils';

@Component({
  selector: 'app-result-framework-report',
  templateUrl: './result-framework-report.component.html',
  styleUrls: ['./result-framework-report.component.css']
})
export class ResultFrameworkReportComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  selectedProjectId: any = null;
  pip: any = null;
  allCosts: any = [];
  rfCosts: any = [];
  formElements: any = [];
  rfForm: any = null;

  resultsChain: any = [];

  constructor(
    private _projectsStore: ProjectsStore,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    // this._activatedRoute.snapshot.queryParams.sub
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // this.getProjectDetails();
      this.getRfMeta();
      this._primaryAppraisalFormsStore.state$.subscribe((data) => {
        // if (data.selectedProject)
        typeof (data.selectedProject.implementationPlan) === 'string' ? this.pip = JSON.parse(data.selectedProject.implementationPlan) : this.pip = data.selectedProject.implementationPlan;
        this.allCosts = this.pip.costs;
        this.rfCosts = _.filter(this.allCosts, (c) => {
          if (c.addRf) {
            // return {
            //   ...c,
            //   type: this.getRfType(c.quarters),
            // };
            let mneType = this.getRfType(c.quarters);
            console.log("GET RF CALLED:--", mneType);
            c.mneType = mneType.mneType;
            c.mneData = mneType.mneData;
            return {
              c
            };
          }
        })
        this.resultsChain = [];
        this.resultsChain = _.chain(this.rfCosts)
          .groupBy('mneType')
          .map((val, _id) => {
            return {
              children: val,
              _id: _id,
            }
          })
          .value();
        // var test = _.groupBy(this.rfCosts, (c) => {

        // })
        console.log("********SELECTED FRAMEWORK DATA*********", data.selectedProject,
          this.pip,
          this.allCosts,
          this.rfCosts,
          this.resultsChain
        );

      })
    });
  }

  getRfMeta() {
    this._settingsService.getProcessTemplate('PROJECT_PROPOSAL').subscribe(
      (result: any) => {
        this.formElements = [];
        let contentElements = [];
        result.sections.forEach(element => {
          if (element.sectionName === "Results Framework") {
            this.rfForm = JSON.parse(element.template);
            FormioUtils.eachComponent(this.rfForm.components, (component) => {
              if (component.key != 'submit') {
                if (component.type != 'content') {
                  this.formElements.push(component);
                } else {
                  contentElements.push(component);
                }
              }
            });
            console.log("****RESULT FRAME WORK REPORT TEMPLATE***:--", this.rfForm, this.formElements, contentElements);
          }
        });
      },
      error => {
        console.log("ERROR FROM TEMPLATES:--", error);
      }
    );
  }

  getRfType(quarters) {
    var mneType = null;
    var mneData = null;
    for (let i = 0; i < quarters.length; i++) {
      var x = quarters[i];
      if (x.data) {
        mneType = x.data.rfSubmitData ? x.data.rfSubmitData.type : null;
        mneData = x.data.rfSubmitData;
        if (mneType === 'output') {
          mneType = x.data.rfSubmitData.selectOutput;
        }
        break;
      }
    }
    return { mneType, mneData };
  }

  // getMneType(obj) {
  //   var n = obj.mneType ? obj.mneDate.toLowerCase().includes("output") : null;
  //   console.log("MNE TYPE OUTPUT:--------------", n, obj);
  // }

  getChainTitle(object, subObject) {
    let item = null;
    if (object.toLowerCase().includes('output')) {
      for (let i = 0; i < this.formElements.length; i++) {
        let key = this.formElements[i];
        // console.log("********RF ENTRY MATCHED:)))))))))))", key);
        if (key.key === 'selectOutput') {
          for (let j = 0; j < key.data.values.length; j++) {
            let key2 = key.data.values[j];
            if (key2.value === object) {
              return key2.label;
            }
          }
        }
      }
    } else if (object.toLowerCase().includes('outcome')) {
      for (let i = 0; i < this.formElements.length; i++) {
        let key = this.formElements[i];
        if (key.key === 'type1') {
          for (let j = 0; j < key.data.values.length; j++) {
            // console.log("********RF ENTRY MATCHED:)))))))))))", subObject);
            let key2 = key.data.values[j];
            if (key2.value === subObject) {
              return key2.label;
            }
          }
        }
      }
    }
  }
  
  getSubOutPutTitle(obj) {
    for (let i = 0; i < this.formElements.length; i++) {
      let key = this.formElements[i];
      if (key.key === 'subOutputs') {
        for (let j = 0; j < key.data.values.length; j++) {
          // console.log("********RF ENTRY MATCHED:)))))))))))", subObject);
          let key2 = key.data.values[j];
          if (key2.value === obj) {
            return key2.label;
          }
        }
      }
    }
    
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
