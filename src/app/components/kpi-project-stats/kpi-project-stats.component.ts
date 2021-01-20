import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SettingsService } from 'src/app/services/settings.service';
import FormioUtils from 'formiojs/utils';
import * as _ from 'lodash';

@Component({
  selector: 'app-kpi-project-stats',
  templateUrl: './kpi-project-stats.component.html',
  styleUrls: ['./kpi-project-stats.component.css']
})
export class KpiProjectStatsComponent implements OnInit {

  apiLoading: boolean = false;
  allProjects: any = null;
  formElements: any = null;
  projectStats: any = null;
  rfForm: any = null;
  outPutsArray: any = null;
  step: any = null;

  constructor(
    private _projectService: ProjectService,
    private _settingsService: SettingsService,
  ) { }


  ngOnInit(): void {
    this.getAllProject();
    this.getRfMeta();
  }

  getRfMeta() {
    this._settingsService.getProcessTemplate('PROJECT_PROPOSAL').subscribe(
      (result: any) => {
        this.formElements = [];
        let contentElements = [];
        result.sections.forEach(element => {
          if (element.sectionName === "Results Framework") {
            this.rfForm = JSON.parse(element.template);
            console.log("****RESULT FRAME WORK REPORT TEMPLATE***:--", this.rfForm);
            FormioUtils.eachComponent(this.rfForm.components, (component) => {
              if (component.key != 'submit') {
                if (component.type != 'content') {
                  this.formElements.push(component);
                } else {
                  contentElements.push(component);
                }
              }
            });
            this.outPutsArray = _.find(this.formElements, { key: 'selectOutput' }).data.values;
            for (let i = 0; i < this.outPutsArray.length; i++) {
              var x = this.outPutsArray[i];
              x.subOutputs = _.find(this.formElements, { key: 'subOutputs' + x.value.split('-')[1] }).data.values;
              for (let j = 0; j < x.subOutputs.length; j++) {
                var y = x.subOutputs[j];
                y.indicators = _.find(this.formElements, { key: 'indicator' + y.value.split('-')[1] }).data.values;
              }
            }
            console.log("****RESULT FRAME WORK REPORT TEMPLATE***:--\n", this.rfForm,
              "\n", this.formElements, "\n", contentElements, "\n", this.outPutsArray);
          }
        });
      },
      error => {
        console.log("ERROR FROM TEMPLATES:--", error);
      }
    );
  }

  getAllProject() {
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        this.allProjects = [];
        var preCount = 0;
        var extCount = 0;
        var urCount = 0;
        for (let i = 0; i < result.length; i++) {
          let element = result[i];
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
          if (element.status === "Under Review") urCount = urCount + 1;
          if (element.status !== 'Draft') {
            this._projectService.getSingleProject(element.id).subscribe(
              (result: any) => {
                // console.log("RESULT SINGLE PROJECT:--", result);
                if (result.implementationPlan !== null) {

                  var object: any = {
                    pip: result.implementationPlan !== null ? JSON.parse(result.implementationPlan) : result.implementationPlan,
                    name: element.name,
                    id: element.id
                  }

                  object.rfCosts = _.filter(object.pip.costs, (c) => {
                    if (c.addRf) {
                      let mneType = this.getRfType(c.quarters);
                      console.log("GET RF CALLED:--", mneType);
                      c.mneType = mneType.mneType;
                      c.mneData = mneType.mneData;
                      return {
                        c
                      };
                    }
                  })
                  object.resultsChain = [];
                  object.resultsChain = _.chain(object.rfCosts)
                    .groupBy('mneType')
                    .map((val, _id) => {
                      return {
                        children: val,
                        _id: _id,
                      }
                    })
                    .value();
                  // console.log("********SELECTED FRAMEWORK DATA*********", data.selectedProject,
                  //   this.pip,
                  //   this.allCosts,
                  //   this.rfCosts,
                  //   this.resultsChain
                  // );
                  this.prepareChartData(object);
                  this.allProjects.push(object);
                  console.log("KPI INDICATORS ALL PROJECTS:--", this.allProjects);
                }
              },
              error => {
                console.log("RESULT SINGLE PROJECT:--", error);
              }
            );
          }
        }
        this.projectStats = {
          preCount,
          extCount,
          urCount,
          totalCount: result.length
        }
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }

  prepareChartData(projectData) {
    projectData.kpiChartLabels = [];
    projectData.kpiChartData = [
      { data: [] },
      { data: [] },
      { data: [] },
    ];
    projectData.kpiChartData[0].data = [];
    projectData.kpiChartData[1].data = [];
    projectData.kpiChartData[2].data = [];
    projectData.indicatorChartLabels = [];
    projectData.indicatorChartData = [
      { data: [] },
      { data: [] },
    ]
    projectData.indicatorChartData[0].data = [];
    projectData.indicatorChartData[1].data = [];

    projectData.provinceArray = [];
    // let resultsChain = [];

    for (let i = 0; i < projectData.resultsChain.length; i++) {
      let targetCount = 0;
      let achievedCount = 0;
      var x = projectData.resultsChain[i];
      for (let j = 0; j < x.children.length; j++) {

        var y = x.children[j];

        var childrenTarget = 0;
        var childrenAchieved = 0;

        var output = y.mneType ? y.mneType.split('-')[1] : null;
        var subOutput = output ? y.mneData['subOutputs' + output] : null;
        var indicator = subOutput ? subOutput.split('-')[1] : null;
        var indicatorValue = indicator ?
          (y.mneData['indicator' + indicator]) ?
            (y.mneData['indicator' + indicator]) : (y.mneData['indicators' + indicator]) : 'Unknown-Kpi';

        if (y.mneType === 'outcome') {
          indicatorValue = y.mneData['selectOutcome']
          // console.log("*****OUTVOMR*****");
        }

        let provinces = [];
        let provincesTarget = [];
        let provincesAchieved = [];
        for (let k = 0; k < y.quarters.length; k++) {
          var z = y.quarters[k];
          if (z.data !== null && z.value) {
            if (z.data.province) {
              if (provinces.length === 0) {
                provinces.push(z.data.province.PROVINCE);
                provincesTarget.push(z.data.target);
                if (z.progress && z.progress !== null)
                  provincesAchieved.push(z.progress.mneProgress);
                else
                  provincesAchieved.push(0);
              } else {
                let provinceIndex = provinces.indexOf(z.data.province.PROVINCE);
                if (provinceIndex > -1) {
                  provincesTarget[provinceIndex] = provincesTarget[provinceIndex] + z.data.target;
                  if (z.progress && z.progress !== null)
                    provincesAchieved[provinceIndex] = provincesAchieved[provinceIndex] + z.progress.mneProgress;
                } else {
                  provinces.push(z.data.province.PROVINCE);
                  provincesTarget.push(z.data.target);
                  if (z.progress && z.progress !== null)
                    provincesAchieved.push(z.progress.mneProgress);
                  else
                    provincesAchieved.push(0);
                }
              }
            }
            if (z.data.target) {
              childrenTarget = childrenTarget + parseInt(z.data.target);
              targetCount = targetCount + parseInt(z.data.target);
            }
          }
          if (z.progress && z.progress !== null) {
            childrenAchieved = childrenAchieved + z.progress.mneProgress;
            achievedCount = achievedCount + z.progress.mneProgress;
          }
        }

        let object = {
          indicatorValue,
          indicator: 'indicator' + indicator,
          provinces: provinces || [],
          provincesTarget,
          provincesAchieved,
          provinceChartLabels: provinces || [],
          provinceChartData: [
            { data: provincesTarget, label: 'Target' },
            { data: provincesAchieved, label: 'Achieved' }
          ],
        }
        projectData.provinceArray.push(object);
        // this.kpiProvinceArray = provinceArray;

        projectData.indicatorChartLabels.push(indicatorValue);
        projectData.indicatorChartData[0].data.push(childrenTarget);
        projectData.indicatorChartData[1].data.push(childrenAchieved);



        console.log(
          "KPI:---", x._id,
          "\nCHILD:---", j,
          '\nCHILD DATA:---', y,
          '\nTARGET COUNT:---', targetCount,
          '\nACHIEVED COUNT:---', achievedCount,
        );

      }
      // console.log(
      //   "KPI:---", x._id,
      // );
      projectData.kpiChartLabels.push(x._id);
      projectData.kpiChartData[0].data.push(targetCount);
      projectData.kpiChartData[1].data.push(achievedCount);
      projectData.kpiChartData[2].data.push(x.children.length);
    }
    // console.log(
    //   "CHART LABELS:---", this.kpiChartLabels,
    //   '\nKPI CHART DATA:---', this.kpiChartData,
    //   '\nKPI PROVINCES ARRAY:---', this.kpiProvinceArray,

    // );
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

  checkProjectsForKpi(value) {
    this.step = value;
    console.log("checkProjectsForKpi(indicator.value)", value);
    for (let i = 0; i < this.allProjects.length; i++) {
      let key = this.allProjects[i];
      if (key.indicatorChartLabels.indexOf(value) > -1) {
        console.log("PROJECT FOUND:---", key, key.indicatorChartLabels.indexOf(value));
      }
    }
  }

}
