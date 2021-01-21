import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SettingsService } from 'src/app/services/settings.service';
import FormioUtils from 'formiojs/utils';
import * as _ from 'lodash';

import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

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

  // BAR CHAT DATA
  public indicatorChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'end',
        font: {
          weight: 'bold'
        },
        color: '#919191',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    elements: {
      line: {
        fill: false
      },
      point: {
        hoverRadius: 7,
        radius: 5
      }
    },
  };

  public indicatorChartLegend = true;
  public indicatorChartPlugins = [pluginDataLabels];
  public indicatorChartType: ChartType = 'bar';

  public indicatorChartLabels: Label[] = [];
  public indicatorChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Target',
    },
    {
      data: [],
      label: 'Achieved',
    },
  ];

  // Radar
  public provinceChartOptions: RadialChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        backgroundColor: function (context) {
          return context.active ?
            '#2e7d32' :
            context.dataset.backgroundColor[context.dataIndex];
        },
        color: function (context) {
          return context.active ?
            '#fff' :
            '#919191';
        },
        // color: '#919191',
        font: {
          weight: 'bold',
          size: 12,
        },
        // formatter: Math.round,
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        padding: 3,

        // formatter: function (value, context) {
        //   return context.active
        //     ? context.dataset.label + '\n' + value
        //     : Math.round(value);
        // },
      },
      scales: {
        // xAxes: [{
        //   ticks: {
        //     // Include a dollar sign in the ticks
        //     callback: function (value, index, values) {
        //       return '$' + value;
        //     }
        //   },
        //   scaleLabel: {
        //     fontSize: 15,
        //     padding: 5,
        //   },
        // }],
        // yAxes: [{
        //   ticks: {
        //     // Include a dollar sign in the ticks
        //     callback: function (value, index, values) {
        //       return '$' + value;
        //     }
        //   },
        //   scaleLabel: {
        //     fontSize: 15,
        //     padding: 5,
        //   },
        // }],
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return '$' + value;
          }
        },
      }


      // scaleLabel:{
      //   font
      // }
    }
  };
  public provinceChartLabels: Label[] = [];
  public provinceChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public provinceChartType: ChartType = 'radar';


  constructor(
    private _projectService: ProjectService,
    private _settingsService: SettingsService,
  ) { }


  ngOnInit(): void {
    this.getAllProject();
    this.getRfMeta();
  }

  getRfMeta() {
    this.apiLoading = true;
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
        this.apiLoading = false;
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
    this.apiLoading = true;
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
                z.data.province.PROVINCE ? provinces.push(z.data.province.PROVINCE) : provinces.push(z.data.province[0].PROVINCE);
                provincesTarget.push(z.data.target);
                if (z.progress && z.progress !== null)
                  provincesAchieved.push(parseInt(z.progress.mneProgress));
                else
                  provincesAchieved.push(0);
              } else {
                let provinceIndex = z.data.province.PROVINCE ? provinces.indexOf(z.data.province.PROVINCE) : provinces.indexOf(z.data.province[0].PROVINCE);
                if (provinceIndex > -1) {
                  provincesTarget[provinceIndex] = provincesTarget[provinceIndex] + z.data.target;
                  if (z.progress && z.progress !== null)
                    provincesAchieved[provinceIndex] = provincesAchieved[provinceIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.province.PROVINCE ? provinces.push(z.data.province.PROVINCE) : provinces.push(z.data.province[0].PROVINCE);
                  provincesTarget.push(z.data.target);
                  if (z.progress && z.progress !== null)
                    provincesAchieved.push(parseInt(z.progress.mneProgress));
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
            childrenAchieved = childrenAchieved + parseInt(z.progress.mneProgress);
            achievedCount = achievedCount + parseInt(z.progress.mneProgress);
          }
        }

        let object = {
          indicatorValue,
          indicator: 'indicator' + indicator,
          provinces: provinces.length ? provinces : [],
          provincesTarget,
          provincesAchieved,
          provinceChartLabels: provinces.length ? provinces : [],
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
    this.apiLoading = false;
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
    this.indicatorChartLabels = [];
    this.indicatorChartData[0].data = [];
    this.indicatorChartData[1].data = [];
    let provincesChart = null;
    let provincesChartArray = [];
    for (let i = 0; i < this.allProjects.length; i++) {
      let key = this.allProjects[i];
      if (key.indicatorChartLabels.indexOf(value) > -1) {
        console.log("PROJECT FOUND:---", key, key.indicatorChartLabels.indexOf(value));
        this.indicatorChartLabels.push(key.name);
        this.indicatorChartData[0].data.push(key.indicatorChartData[0].data[key.indicatorChartLabels.indexOf(value)]);
        this.indicatorChartData[1].data.push(key.indicatorChartData[1].data[key.indicatorChartLabels.indexOf(value)]);
        provincesChartArray.push(_.find(key.provinceArray, { indicatorValue: value }));
      }
    }
    let tempProvinces = [];
    let tempProvincesTarget = [];
    let tempProvincesAchieved = [];
    for (let i = 0; i < provincesChartArray.length; i++) {
      let key = provincesChartArray[i];
      tempProvinces = tempProvinces.concat(key.provinces);
      tempProvincesTarget = tempProvincesTarget.concat(key.provincesTarget);
      tempProvincesAchieved = tempProvincesAchieved.concat(key.provincesAchieved);
    }
    this.provinceChartLabels = tempProvinces;
    this.provinceChartData[0].data = tempProvincesTarget;
    this.provinceChartData[1].data = tempProvincesAchieved;
    console.log("checkProjectsForKpi(indicator.value)", value,
      '\n', provincesChartArray,
      '\n', tempProvinces,
      '\n', tempProvincesTarget,
      '\n', tempProvincesAchieved,
    );
  }

  changeIndiChartType() {
    this.indicatorChartType === 'line' ? this.indicatorChartType = 'bar' : this.indicatorChartType = 'line';
  }

}
