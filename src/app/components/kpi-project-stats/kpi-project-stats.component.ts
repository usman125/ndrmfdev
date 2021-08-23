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
  chartLoading: boolean = false;
  allProjects: any = null;
  formElements: any = null;
  projectStats: any = null;
  rfForm: any = null;
  outPutsArray: any = null;
  step: any = null;

  // BAR CHAT DATA
  public indicatorChartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scales: { xAxes: [{ stacked: false }], yAxes: [{ stacked: false }] },
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

  // Radar PROVINCES
  public provinceChartOptions: RadialChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        backgroundColor: function (context) {
          // console.log("PROVINCES CONTECT:---", context)
          return context.active ?
            '#2e7d32' :
            context.dataset.backgroundColor[context.dataIndex];
        },
        // color: function (context) {
        //   return context.active ?
        //     '#fff' :
        //     '#191919';
        // },
        color: '#191919',
        font: {
          weight: 'bold',
          size: 12,
        },
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

    }
  };
  public provinceChartLabels: Label[] = [];
  public provinceChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public provinceChartType: ChartType = 'radar';

  // Radar DIVISIONS
  public divisionChartOptions: RadialChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    title: {
      fontSize: 15,
      padding: 5,
    },
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
            '#191919';
        },
        // pointBackgroundColor: function (context) {
        //   return context.active ?
        //     '#2e7d32' :
        //     context.dataset.hoverBackgroundColor[context.dataIndex];
        // },
        // color: '#191919',
        font: {
          weight: 'bold',
          size: 12,
        },


        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        // pointHoverBackgroundColor: 'red',
        padding: 3,
        // margin: 3,
        // formatter: function (value, context) {
        //   return context.active
        //     ? context.dataset.label + '\n' + value
        //     : Math.round(value);
        // },
      },

    }
  };
  public divisionChartLabels: Label[] = [];
  public divisionChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public divisionChartType: ChartType = 'radar';

  public districtChartLabels: Label[] = [];
  public districtChartData: ChartDataSets[] = [
    { data: [], label: 'Target', hoverBackgroundColor: '#2e7d32', pointHoverBackgroundColor: 'red' },
    { data: [], label: 'Achieved', hoverBackgroundColor: '#2e7d32', pointHoverBackgroundColor: 'red' }
  ];
  public districtChartType: ChartType = 'radar';

  public tehsilChartLabels: Label[] = [];
  public tehsilChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public tehsilChartType: ChartType = 'radar';

  public ucChartLabels: Label[] = [];
  public ucChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public ucChartType: ChartType = 'radar';


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

        let divisions = [];
        let divisionsTarget = [];
        let divisionsAchieved = [];

        let districts = [];
        let districtsTarget = [];
        let districtsAchieved = [];

        let tehsils = [];
        let tehsilsTarget = [];
        let tehsilsAchieved = [];

        let ucs = [];
        let ucsTarget = [];
        let ucsAchieved = [];

        for (let k = 0; k < y.quarters.length; k++) {
          var z = y.quarters[k];
          if (z.data !== null && z.value) {
            if (z.data.province) {
              if (provinces.length === 0) {
                z.data.province.PROVINCE ?
                  provinces.push(z.data.province.PROVINCE) :
                  provinces.push(z.data.province[0].PROVINCE);
                provincesTarget.push(parseInt(z.data.target));
                if (z.progress && z.progress !== null)
                  provincesAchieved.push(parseInt(z.progress.mneProgress));
                else
                  provincesAchieved.push(0);
              } else {
                let provinceIndex = z.data.province.PROVINCE ?
                  provinces.indexOf(z.data.province.PROVINCE) :
                  provinces.indexOf(z.data.province[0].PROVINCE);
                if (provinceIndex > -1) {
                  provincesTarget[provinceIndex] = provincesTarget[provinceIndex] + parseInt(z.data.target);
                  if (z.progress && z.progress !== null)
                    provincesAchieved[provinceIndex] = provincesAchieved[provinceIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.province.PROVINCE ?
                    provinces.push(z.data.province.PROVINCE) :
                    provinces.push(z.data.province[0].PROVINCE);
                  provincesTarget.push(parseInt(z.data.target));
                  if (z.progress && z.progress !== null)
                    provincesAchieved.push(parseInt(z.progress.mneProgress));
                  else
                    provincesAchieved.push(0);
                }
              }
            }
            if (z.data.division) {
              if (divisions.length === 0) {
                z.data.division.DIVISION ?
                  divisions.push(z.data.division.DIVISION) :
                  divisions.push(z.data.division[0].DIVISION);
                divisionsTarget.push(parseInt(z.data.target));
                if (z.progress && z.progress !== null)
                  divisionsAchieved.push(parseInt(z.progress.mneProgress));
                else
                  divisionsAchieved.push(0);
              } else {
                let divisionIndex = z.data.division.DIVISION ?
                  divisions.indexOf(z.data.division.DIVISION) :
                  divisions.indexOf(z.data.division[0].DIVISION);
                if (divisionIndex > -1) {
                  divisionsTarget[divisionIndex] = divisionsTarget[divisionIndex] + parseInt(z.data.target);
                  if (z.progress && z.progress !== null)
                    divisionsAchieved[divisionIndex] = divisionsAchieved[divisionIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.division.DIVISION ?
                    divisions.push(z.data.division.DIVISION) :
                    divisions.push(z.data.division[0].DIVISION);
                  divisionsTarget.push(parseInt(z.data.target));
                  if (z.progress && z.progress !== null)
                    divisionsAchieved.push(parseInt(z.progress.mneProgress));
                  else
                    divisionsAchieved.push(0);
                }
              }
            }
            if (z.data.district) {
              if (districts.length === 0) {
                z.data.district.DISTRICT ?
                  districts.push(z.data.district.DISTRICT) :
                  districts.push(z.data.district[0].DISTRICT);
                districtsTarget.push(parseInt(z.data.target));
                if (z.progress && z.progress !== null)
                  districtsAchieved.push(parseInt(z.progress.mneProgress));
                else
                  districtsAchieved.push(0);
              } else {
                let districtIndex = z.data.district.DISTRICT ?
                  districts.indexOf(z.data.district.DISTRICT) :
                  districts.indexOf(z.data.district[0].DISTRICT);
                if (districtIndex > -1) {
                  districtsTarget[districtIndex] = districtsTarget[districtIndex] + parseInt(z.data.target);
                  if (z.progress && z.progress !== null)
                    districtsAchieved[districtIndex] = districtsAchieved[districtIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.district.DISTRICT ?
                    districts.push(z.data.district.DISTRICT) :
                    districts.push(z.data.district[0].DISTRICT);
                  districtsTarget.push(parseInt(z.data.target));
                  if (z.progress && z.progress !== null)
                    districtsAchieved.push(parseInt(z.progress.mneProgress));
                  else
                    districtsAchieved.push(0);
                }
              }
            }
            if (z.data.tehsil) {
              if (tehsils.length === 0) {
                z.data.tehsil.TEHSIL ?
                  tehsils.push(z.data.tehsil.TEHSIL) :
                  tehsils.push(z.data.tehsil[0].TEHSIL);
                tehsilsTarget.push(parseInt(z.data.target));
                if (z.progress && z.progress !== null)
                  tehsilsAchieved.push(parseInt(z.progress.mneProgress));
                else
                  tehsilsAchieved.push(0);
              } else {
                let tehsilIndex = z.data.tehsil.TEHSIL ?
                  tehsils.indexOf(z.data.tehsil.TEHSIL) :
                  tehsils.indexOf(z.data.tehsil[0].TEHSIL);
                if (tehsilIndex > -1) {
                  tehsilsTarget[tehsilIndex] = tehsilsTarget[tehsilIndex] + parseInt(z.data.target);
                  if (z.progress && z.progress !== null)
                    tehsilsAchieved[tehsilIndex] = tehsilsAchieved[tehsilIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.tehsil.TEHSIL ?
                    tehsils.push(z.data.tehsil.TEHSIL) :
                    tehsils.push(z.data.tehsil[0].TEHSIL);
                  tehsilsTarget.push(parseInt(z.data.target));
                  if (z.progress && z.progress !== null)
                    tehsilsAchieved.push(parseInt(z.progress.mneProgress));
                  else
                    tehsilsAchieved.push(0);
                }
              }
            }
            if (z.data.uc) {
              if (ucs.length === 0) {
                z.data.uc.UC ?
                  ucs.push(z.data.uc.UC) :
                  ucs.push(z.data.uc[0].UC);
                ucsTarget.push(parseInt(z.data.target));
                if (z.progress && z.progress !== null)
                  ucsAchieved.push(parseInt(z.progress.mneProgress));
                else
                  ucsAchieved.push(0);
              } else {
                let ucIndex = z.data.uc.UC ?
                  ucs.indexOf(z.data.uc.UC) :
                  ucs.indexOf(z.data.uc[0].UC);
                if (ucIndex > -1) {
                  ucsTarget[ucIndex] = ucsTarget[ucIndex] + parseInt(z.data.target);
                  if (z.progress && z.progress !== null)
                    ucsAchieved[ucIndex] = ucsAchieved[ucIndex] + parseInt(z.progress.mneProgress);
                } else {
                  z.data.uc.UC ?
                    ucs.push(z.data.uc.UC) :
                    ucs.push(z.data.uc[0].UC);
                  ucsTarget.push(parseInt(z.data.target));
                  if (z.progress && z.progress !== null)
                    ucsAchieved.push(parseInt(z.progress.mneProgress));
                  else
                    ucsAchieved.push(0);
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
          divisions: divisions.length ? divisions : [],
          divisionsTarget,
          divisionsAchieved,
          divisionChartLabels: divisions.length ? divisions : [],
          divisionChartData: [
            { data: divisionsTarget, label: 'Target' },
            { data: divisionsAchieved, label: 'Achieved' }
          ],
          districts: districts.length ? districts : [],
          districtsTarget,
          districtsAchieved,
          disctrictChartLabels: districts.length ? districts : [],
          disctrictChartData: [
            { data: districtsTarget, label: 'Target' },
            { data: districtsAchieved, label: 'Achieved' }
          ],
          tehsils: tehsils.length ? tehsils : [],
          tehsilsTarget,
          tehsilsAchieved,
          tehsilChartLabels: tehsils.length ? tehsils : [],
          tehsilChartData: [
            { data: tehsilsTarget, label: 'Target' },
            { data: tehsilsAchieved, label: 'Achieved' }
          ],
          ucs: ucs.length ? ucs : [],
          ucsTarget,
          ucsAchieved,
          ucChartLabels: ucs.length ? ucs : [],
          ucChartData: [
            { data: ucsTarget, label: 'Target' },
            { data: ucsAchieved, label: 'Achieved' }
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

    let indicatorChartLabels = [];
    let indicatorChartData = [
      {
        data: [],
        label: 'Target',
      },
      {
        data: [],
        label: 'Achieved',
      },
    ];

    let provincesChart = null;
    let provincesChartArray = [];



    for (let i = 0; i < this.allProjects.length; i++) {
      this.chartLoading = true;
      let key = this.allProjects[i];
      if (key.indicatorChartLabels.indexOf(value) > -1) {
        console.log("PROJECT FOUND:---", key, key.indicatorChartLabels.indexOf(value));
        indicatorChartLabels.push(key.name);
        indicatorChartData[0].data.push(key.indicatorChartData[0].data[key.indicatorChartLabels.indexOf(value)]);
        indicatorChartData[1].data.push(key.indicatorChartData[1].data[key.indicatorChartLabels.indexOf(value)]);
        provincesChartArray.push(_.find(key.provinceArray, { indicatorValue: value }));
      }
    }

    this.indicatorChartLabels = indicatorChartLabels;
    this.indicatorChartData[0].data = indicatorChartData[0].data;
    this.indicatorChartData[1].data = indicatorChartData[1].data;


    this.chartLoading = false;

    let tempProvinces = [];
    let tempProvincesTarget = [];
    let tempProvincesAchieved = [];

    let tempDivisions = [];
    let tempDivisionsTarget = [];
    let tempDivisionsAchieved = [];

    let tempDistricts = [];
    let tempDistrictsTarget = [];
    let tempDistrictsAchieved = [];

    let tempTehsils = [];
    let tempTehsilsTarget = [];
    let tempTehsilsAchieved = [];

    let tempUcs = [];
    let tempUcsTarget = [];
    let tempUcsAchieved = [];

    for (let i = 0; i < provincesChartArray.length; i++) {

      this.chartLoading = true;
      let key = provincesChartArray[i];

      tempProvinces = tempProvinces.concat(key.provinces);
      tempProvincesTarget = tempProvincesTarget.concat(key.provincesTarget);
      tempProvincesAchieved = tempProvincesAchieved.concat(key.provincesAchieved);

      tempDivisions = tempDivisions.concat(key.divisions);
      tempDivisionsTarget = tempDivisionsTarget.concat(key.divisionsTarget);
      tempDivisionsAchieved = tempDivisionsAchieved.concat(key.divisionsAchieved);

      tempDistricts = tempDistricts.concat(key.districts);
      tempDistrictsTarget = tempDistrictsTarget.concat(key.districtsTarget);
      tempDistrictsAchieved = tempDistrictsAchieved.concat(key.districtsAchieved);

      tempTehsils = tempTehsils.concat(key.tehsils);
      tempTehsilsTarget = tempTehsilsTarget.concat(key.tehsilsTarget);
      tempTehsilsAchieved = tempTehsilsAchieved.concat(key.tehsilsAchieved);

      tempUcs = tempUcs.concat(key.ucs);
      tempUcsTarget = tempUcsTarget.concat(key.ucsTarget);
      tempUcsAchieved = tempUcsAchieved.concat(key.ucsAchieved);
    }
    this.chartLoading = false;

    this.provinceChartLabels = tempProvinces;
    this.provinceChartData[0].data = tempProvincesTarget;
    this.provinceChartData[1].data = tempProvincesAchieved;

    this.divisionChartLabels = tempDivisions;
    this.divisionChartData[0].data = tempDivisionsTarget;
    this.divisionChartData[1].data = tempDivisionsAchieved;

    this.districtChartLabels = tempDistricts;
    this.districtChartData[0].data = tempDistrictsTarget;
    this.districtChartData[1].data = tempDistrictsAchieved;

    this.tehsilChartLabels = tempTehsils;
    this.tehsilChartData[0].data = tempTehsilsTarget;
    this.tehsilChartData[1].data = tempTehsilsAchieved;

    this.ucChartLabels = tempUcs;
    this.ucChartData[0].data = tempUcsTarget;
    this.ucChartData[1].data = tempUcsAchieved;

    // console.log("checkProjectsForKpi(indicator.value)", value,
    //   '\n', provincesChartArray,
    //   '\n', tempProvinces,
    //   '\n', tempProvincesTarget,
    //   '\n', tempProvincesAchieved,
    //   '\n', tempDivisions,
    //   '\n', tempDivisionsTarget,
    //   '\n', tempDivisionsAchieved,
    //   '\n', tempDistricts,
    //   '\n', tempDistrictsTarget,
    //   '\n', tempDistrictsAchieved,
    //   '\n', tempTehsils,
    //   '\n', tempTehsilsTarget,
    //   '\n', tempTehsilsAchieved,
    //   '\n', tempUcs,
    //   '\n', tempUcsTarget,
    //   '\n', tempUcsAchieved,
    // );
    this.chartLoading = false;
  }

  changeIndiChartType() {
    this.indicatorChartType === 'line' ? this.indicatorChartType = 'bar' : this.indicatorChartType = 'line';
  }

}
